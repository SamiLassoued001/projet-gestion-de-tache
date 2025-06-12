import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const CreateTaskForm = () => {
  const { userId } = useParams(); // récupère l'ID de l'utilisateur ciblé
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/tasks", {
        assignedTo: userId,
        title,
        description,
        dueDate,
      });
      setMessage("Tâche créée et notification envoyée !");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setMessage("Erreur lors de la création de la tâche");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Créer une Tâche</Typography>

      <TextField label="Titre" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Date limite" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      
      <Button variant="contained" fullWidth onClick={handleSubmit}>Créer</Button>

      {message && <Typography mt={2} color="primary">{message}</Typography>}
    </Box>
  );
};

export default CreateTaskForm;
