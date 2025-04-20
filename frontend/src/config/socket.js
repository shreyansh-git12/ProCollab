import { io } from "socket.io-client";

let socketInstance = null;

export const initSocket = (projectId) => {
  if (socketInstance) return socketInstance;

  socketInstance = io(import.meta.env.VITE_API_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
    query: {
      projectId,
    },
  });

  socketInstance.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socketInstance;
};

export const receiveMessage = (event, cb) => {
  if (!socketInstance) {
    console.warn("Socket not initialized yet");
    return;
  }
  socketInstance.off(event);
  socketInstance.on(event, cb);
};

export const sendMessage = (event, data) => {
  if (!socketInstance) {
    console.warn("Socket not initialized yet");
    return;
  }
  socketInstance.emit(event, data);
};
