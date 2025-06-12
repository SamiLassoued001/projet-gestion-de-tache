import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fab,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const AddTask = ({ socket }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    date: "",
    status: "todo",
    category: "todo",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.title.trim() || !taskData.content.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (!user || !user._id) {
      alert("Utilisateur non authentifié");
      return;
    }

    const payload = {
      ...taskData,
      assignedUser: user._id,
      category: "todo",
      status: "pending",
    };

    try {
      // 1. Créer la tâche
      const response = await axios.post("http://localhost:5000/task", payload);
      console.log("✅ Tâche créée:", response.data);

      // 2. Émettre via socket
      if (socket) socket.emit("createTask", response.data);

      // 3. Envoyer une notification
      const notificationRes = await axios.post("http://localhost:5000/api/send", {
        userId: user._id,
        message: `📌 Nouvelle tâche ajoutée : ${taskData.title}`,
        link: "/Task",
      });

      console.log("📨 Notification envoyée:", notificationRes.data);

      // 4. Réinitialiser le formulaire
      setTaskData({
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
        status: "pending",
        category: "todo",
      });
      setShowModal(false);
    } catch (error) {
      console.error("❌ Erreur:", error.response?.data || error.message);
      alert("Erreur lors de l'ajout de la tâche ou de l'envoi de la notification.");
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setShowModal(true)}
        style={{ position: "fixed", bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Nouvelle Tâche</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label="Titre"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Contenu"
                name="content"
                value={taskData.content}
                onChange={handleChange}
                multiline
                rows={4}
                required
                fullWidth
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={taskData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)} color="secondary">
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddTask;
