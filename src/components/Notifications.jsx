import React, { useEffect, useState, useRef } from "react";
import socket from "../socket";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const listRef = useRef();

  // ✅ Step 1: Extract user ID
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const id = parsed?.user?.id;
        if (id) {
          console.log("📦 Extracted userId:", id);
          setUserId(id);
        }
      } catch (error) {
        console.error("❌ Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // ✅ Step 2: Fetch saved notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
        const formatted = res.data.map((notif) => ({
          id: notif._id,
          title: notif.message,
          link: notif.link,
          time: new Date(notif.createdAt).toLocaleString(),
        }));
        setNotifications(formatted);
        console.log("📥 Loaded saved notifications:", formatted);
      } catch (err) {
        console.error("❌ Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, [userId]);

  // ✅ Step 3: Register and listen via socket
  useEffect(() => {
    if (!userId) return;

    socket.emit("register-user", userId);
    console.log("📤 Sent register-user for ID:", userId);

    socket.on("new-notification", (data) => {
      console.log("📨 New notification received:", data.message);
      const newNotif = {
        id: Date.now(),
        title: data.message,
        time: "maintenant",
      };

      setNotifications((prev) => [newNotif, ...prev]);
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    });

    return () => socket.off("new-notification");
  }, [userId]);

  // ✅ Step 4: Scroll to top
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [notifications]);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          backgroundColor: "white",
          width: 250,
          position: "absolute",
          top: 50,
          right: 50,
          border: "2px solid rgba(81, 185, 250, 0.1)",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: 16,
          overflowY: "auto",
          zIndex: 999,
          maxHeight: 300,
        }}
        ref={listRef}
      >
        <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 18, color: "#517BFF" }}>
          Notifications
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {notifications.length === 0 ? (
            <li style={{ color: "#999", fontSize: 14 }}>Aucune notification</li>
          ) : (
            notifications.map(({ id, title, time }) => (
              <li
                key={id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                  fontSize: 14,
                  color: "#333",
                }}
              >
                <strong>{title}</strong>
                <div style={{ fontSize: 12, color: "#999" }}>{time}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
