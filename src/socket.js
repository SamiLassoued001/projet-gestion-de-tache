// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket"],
//   withCredentials: true,
// });

// socket.on("connect", () => {
//   console.log("✅ Socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.error("❌ Socket connection error:", err.message);
// });

// export default socket;


import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Socket connecté :", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Erreur de connexion Socket:", err.message);
});

export default socket;
