import React from "react";

const notifications = [
  { id: 1, title: "Nouvelle commande reçue", time: "10 min ago" },
  { id: 2, title: "Utilisateur connecté", time: "30 min ago" },
  { id: 3, title: "Mise à jour du système", time: "1 h ago" },
  { id: 4, title: "Message de support", time: "2 h ago" },
];

export default function NotificationBox() {
  return (
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
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 16,
          fontSize: 18,
          color: "#517BFF",
        }}
      >
        Notifications
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notifications.map(({ id, title, time }) => (
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
        ))}
      </ul>
    </div>
  );
}
