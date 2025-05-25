import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
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
        date: editTaskData.date?.slice(0, 10) || "",
      });
    }
  }, [editTaskData]);

  if (!editTaskData) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, _id } = editTaskData;

    try {
      const response = await axios.put(`http://localhost:5000/task/tasks/${_id}`, formData);

      const updatedTask = response.data;

      setTasks((prev) => {
        const updated = { ...prev };
        const index = updated[category].items.findIndex((task) => task._id === _id);
        if (index !== -1) {
          updated[category].items[index] = updatedTask;
        }
        return updated;
      });

      socket.emit("editTask", {
        category,
        taskId: _id,
        ...formData,
      });

      setEditTaskData(null);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <Dialog open={!!editTaskData} onClose={() => setEditTaskData(null)} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier la tâche</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Titre"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Contenu"
              name="content"
              value={formData.content}
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
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTaskData(null)} color="secondary">
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdatedTask;
