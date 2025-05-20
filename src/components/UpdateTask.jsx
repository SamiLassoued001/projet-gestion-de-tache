import { useState, useEffect } from "react";
import axios from "axios";

const UpdatedTask = ({ editTaskData, setEditTaskData, setTasks, socket }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    if (editTaskData) {
      setFormData({
        title: editTaskData.title || "",
        content: editTaskData.content || "",
        date: editTaskData.date?.slice(0, 10) || "", // format YYYY-MM-DD
      });
    }
  }, [editTaskData]);

  if (!editTaskData) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, _id } = editTaskData;

    try {
      // Appel backend (PUT)
      const response = await axios.put(`http://localhost:5000/task/tasks/${_id}`, {
        title: formData.title,
        content: formData.content,
        date: formData.date,
      });

      const updatedTask = response.data;

      // Mise à jour locale
      setTasks((prev) => {
        const updated = { ...prev };
        const index = updated[category].items.findIndex((task) => task._id === _id);
        if (index !== -1) {
          updated[category].items[index] = updatedTask;
        }
        return updated;
      });

      // Notification en temps réel
      socket.emit("editTask", {
        category,
        taskId: _id,
        newTitle: formData.title,
        newContent: formData.content,
        newDate: formData.date,
      });

      setEditTaskData(null); // Fermer le formulaire

    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Modifier la tâche</h2>
        <form onSubmit={handleSubmit}>
          <label>Titre:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label>Contenu:</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />

          <label>Date:</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Enregistrer</button>
            <button type="button" className="cancel-btn" onClick={() => setEditTaskData(null)}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatedTask;
