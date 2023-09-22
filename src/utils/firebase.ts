import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

import { env } from "~/env.mjs";
import { HTTPApi, queryClient } from "~/services/http";

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
const db = typeof window !== "undefined" ? getFirestore(app) : null;

const VAPID_KEY = env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export function useFCMToken() {
  const { mutate } = useMutation({
    mutationFn: async (body: { fcm_id: string }) => {
      const res = await HTTPApi.post("user/fcm", body);

      return res.data as unknown;
    },
  });

  useEffect(() => {
    requestNotificationPermission((fcm_id: string) => mutate({ fcm_id })).catch(
      (e) => console.error(e)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useChatOnlineIndicator(userId?: string) {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const [online, setOnline] = useState({ status: "offline", time: "" });

  useEffect(() => {
    if (db && userId) {
      try {
        const unsubscribe = onSnapshot(
          doc(db, "online-status", userId),
          (snapshot) => {
            const onlineStatus = snapshot.data() as
              | { last_online: string; online: true }
              | undefined;
            const time = onlineStatus?.last_online
              ? dayjs
                  .duration(dayjs(onlineStatus.last_online).diff(dayjs()))
                  .humanize(true)
              : undefined;
            setOnline({
              status: onlineStatus?.online ? "online" : "offline",
              time: time ? "Active " + time : "",
            });
          }
        );

        return unsubscribe;
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId]);

  return { online };
}

export function useOnMessage() {
  useEffect(() => {
    if (messaging) {
      console.log("Foreground push notification started");
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
        if (payload.data) {
          switch (payload.data?.module) {
            case "MODERATION":
              void queryClient.invalidateQueries({
                queryKey: ["moderation-list", "1"],
              });
              void queryClient.invalidateQueries({
                queryKey: ["moderation-messages", payload.data?.room_id],
              });
              break;
            case "CHAT":
              void queryClient.invalidateQueries({
                queryKey: ["chat-room"],
              });
              void queryClient.invalidateQueries({
                queryKey: ["chat-messages", payload.data?.room_id],
              });
              break;
            case "TRANSACTION":
              void queryClient.invalidateQueries({
                queryKey: ["notification-count"],
              });
              void queryClient.invalidateQueries({
                queryKey: ["notification-list", "store"],
              });
              break;
            case "EVENT":
              void queryClient.invalidateQueries({
                queryKey: ["notification-count"],
              });
              void queryClient.invalidateQueries({
                queryKey: ["notification-list", "update"],
              });
              break;
          }
        }
      });

      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);
}

export const requestNotificationPermission = async (
  callback: (data: string) => void
) => {
  if (typeof window !== "undefined" && "Notification" in window) {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      if (messaging) {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });

        if (token) {
          localStorage.setItem("fcm_token", token);
          callback(token);
        }
      }
    }
  }
};

// function mapFirebaseNotificationToModerationChatProps(data: {
//   [key: string]: string;
// }) {
//   queryClient.setQueryData(
//     ["moderation-list", "1"],
//     (old: {
//       pageParams: unknown[];
//       pages: any;
//     }): { pageParams: unknown[]; pages: any } => ({
//       pageParams: old?.pageParams as unknown[],
//       pages: old?.pages.map((page) => ({
//         ...page,
//         data: page.data.map((room) =>
//           room.id === data.room_id ? { ...room, is_read: false } : room
//         ),
//       })),
//     })
//   );
// }

// useEffect(() => {
//   onMessageListener()
//     .then((payload: any) => {
//       if (chatId?.at(0) !== payload.room_id) {
//         queryClient.setQueryData(["moderation-list"], (old: any) =>
//           old.map((r: any) =>
//             r.id === payload.room_id ? { ...r, is_read: false } : r
//           )
//         );
//       } else {
//         queryClient.setQueryData(
//           ["moderation-messages", chatId?.at(0)],
//           (old: any) => {
//             const record = Array.from(old)[old.size - 1] as [string, any];
//             old.set(record[0], [
//               ...record[1],
//               mapModerationMessageToChatMessageListItemProps(payload),
//             ]);
//             return old;
//           }
//         );
//       }
//     })
//     .catch((e) => console.error(e));
// }, [chatId]);
