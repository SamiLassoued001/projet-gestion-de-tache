import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const UpdateTask = ({ editTaskData, setEditTaskData, setTasks, socket }) => {
  const [formData, setFormData] = useState({
    date: "",
    status: "pending", // ⚠️ le champ utilisé côté backend
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editTaskData) {
      setFormData({
        date: editTaskData.date?.slice(0, 10) || "",
        status: editTaskData.status || "pending", // ⚠️ valeur compatible avec backend
      });
    }
  }, [editTaskData]);

  if (!editTaskData) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _id, status: oldStatus } = editTaskData;

    try {
      const response = await axios.put(
        `http://localhost:5000/task/tasks/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTask = response.data;
      const newStatus = updatedTask.status;

      setTasks((prev) => {
        const newTasks = { ...prev };
        newTasks[oldStatus].items = newTasks[oldStatus].items.filter(
          (task) => task._id !== _id
        );
        if (newTasks[newStatus]) {
          newTasks[newStatus].items = [updatedTask, ...newTasks[newStatus].items];
        }
        return newTasks;
      });

      socket.emit("fetchTasks");
      setEditTaskData(null);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
      alert("Échec de la mise à jour. Vérifiez vos droits.");
    }
  };

  return (
    <Dialog open={!!editTaskData} onClose={() => setEditTaskData(null)} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Modifier la tâche</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Titre"
              value={editTaskData.title}
              disabled
              fullWidth
            />
            <TextField
              label="Contenu"
              value={editTaskData.content}
              disabled
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              select
              label="Statut"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="pending">À faire</MenuItem>
              <MenuItem value="ongoing">En cours</MenuItem>
              <MenuItem value="completed">Terminé</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTaskData(null)} color="secondary">
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateTask;
