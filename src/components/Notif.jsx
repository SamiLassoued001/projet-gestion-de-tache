// components/NotificationProvider.jsx
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Remplace ceci par ton vrai backend WebSocket
const SOCKET_SERVER_URL = 'http://localhost:5000';

let socket;

export default function NotificationProvider({ userId, children }) {
  useEffect(() => {
    // Initialiser la connexion WebSocket
    socket = io(SOCKET_SERVER_URL);

    // Envoyer l'identifiant utilisateur au backend
    socket.emit('register', userId);

    // Écouter les notifications entrantes
    socket.on('new-task', (data) => {
      toast.info(`Nouvelle tâche : ${data.title}`, {
        position: 'bottom-right',
        autoClose: 5000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}
