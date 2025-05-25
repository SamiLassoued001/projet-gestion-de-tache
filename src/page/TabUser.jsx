import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import { Box, Typography } from "@mui/material";
import Head from "../components/Head";

const TaskDetail = () => {
  const [tasks, setTasks] = useState([]);  // tableau de tâches
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    try {
      
      const res = await axios.get(`http://localhost:5000/task/user/${user?._id}`);
      console.log("API Response:", res.data.data); // debug
      setTasks(res.data.data); // ici on stocke le tableau complet
    } catch (err) {
      console.error("API Error:", err);
      setError("Erreur lors de la récupération des tâches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 

 

  if (tasks.length === 0) {
    return (
      <AppLayout>
        <Box sx={{ p: 3 }}>
          <Typography>Aucune tâche trouvée.</Typography>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {tasks.map((task) => (
        <Box key={task._id} sx={{ p: 3, mb: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Head title={`Détails de la tâche : ${task.title}`} />
          <Typography variant="h5" gutterBottom>{task.title}</Typography>
          <Typography><strong>Description :</strong> {task.content}</Typography>
          <Typography><strong>Date :</strong> {new Date(task.date).toLocaleDateString()}</Typography>
          <Typography><strong>Statut :</strong> {task.status}</Typography>
          <Typography>
            <strong>Assignée à :</strong> {task.assignedUser?.name || "Non assignée"}
          </Typography>

          {task.comments && task.comments.length > 0 && (
            <Box mt={2}>
              <Typography variant="h6">Commentaires :</Typography>
              <ul>
                {task.comments.map((comment, index) => (
                  <li key={index}>
                    <Typography>{comment}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      ))}
    </AppLayout>
  );
};

export default TaskDetail;
