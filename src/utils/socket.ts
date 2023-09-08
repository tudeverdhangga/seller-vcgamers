import { useEffect } from "react";
import { io } from "socket.io-client";
import { useGetProfile } from "~/services/api/auth";

export const socket = io("https://beta.vcg.asia", {
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
