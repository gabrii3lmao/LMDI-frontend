import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

const BACKEND_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BACKEND_URL
  : "http://localhost:3000";

export function connectSocket(token: string): Socket | null {
  if (socket?.connected) return socket;

  socket = io(BACKEND_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect_error", (err) => {
    console.error("[Socket] Erro de conexão:", err.message);
  });

  socket.on("connect", () => {
    console.log("[Socket] Conectado");
  });

  socket.on("disconnect", (reason) => {
    console.log("[Socket] Desconectado:", reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}

export function getSocket(): Socket | null {
  return socket;
}
