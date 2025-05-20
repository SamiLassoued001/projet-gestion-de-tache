import { useState, useEffect } from "react";
const AddTask = ({ socket }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    date: "",
    status: "pending",
  });

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!taskData.title.trim() || !taskData.content.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      if (socket) {
        socket.emit("createTask", taskData); // ✅ Utilise WebSocket au lieu d'Axios
      }

      setTaskData({
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
        status: "pending",
      });

      setShowModal(false);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout :", error);
    }
  };

  return (
    <div>
      <button className="addTodoBtn" onClick={handleOpenModal}>+ Ajouter</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Nouvelle Tâche</h2>
            <form onSubmit={handleAddTodo}>
              <label>Titre:</label>
              <input type="text" name="title" value={taskData.title} onChange={handleChange} required />

              <label>Contenu:</label>
              <textarea name="content" value={taskData.content} onChange={handleChange} required></textarea>

              <label>Date de création:</label>
              <input type="date" name="date" value={taskData.date} onChange={handleChange} required />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Ajouter</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
