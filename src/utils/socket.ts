import { useEffect } from "react";
import { io } from "socket.io-client";
import { useGetProfile } from "~/services/api/auth";
import { env } from "~/env.mjs";

export const socket = io(env.NEXT_PUBLIC_WS_URL + "/presence", {
  reconnection: true,
  withCredentials: true,
  path: "/ws",
});

export function useSetOnlineIndicator() {
  const { data } = useGetProfile();

  const userId = data?.data.id;

  useEffect(() => {
    if (userId) {
      socket.emit("new-user", {
        code: userId,
        timestamp: new Date().toISOString(),
      });
    }
  }, [userId]);
}
