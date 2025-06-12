import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import Head from "../components/Head";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const TaskDetail = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/task/user/${user?._id}`);
      setTasks(res.data.data);
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

  if (loading) {
    return (
      <AppLayout>
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Box sx={{ p: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </AppLayout>
    );
  }

  if (tasks.length === 0) {
    return (
      <AppLayout>
        <Box sx={{ p: 4 }}>
          <Alert severity="info">Aucune tâche trouvée.</Alert>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ p: 4 }}>
        <Head title="Mes Tâches" />
       

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Titre</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Assignée à</strong></TableCell>
                <TableCell><strong>Commentaires</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.content}</TableCell>
                  <TableCell>{new Date(task.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      color={
                        task.status === "terminé"
                          ? "success"
                          : task.status === "en cours"
                          ? "warning"
                          : "default"
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{task.assignedUser?.name || "Non assignée"}</TableCell>
                  <TableCell>
                    {task.comments?.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: 15 }}>
                        {task.comments.map((comment, index) => (
                          <li key={index}>
                            <Typography variant="caption">
                              <strong>{comment.name} :</strong> {comment.text}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography variant="caption">Aucun</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AppLayout>
  );
};

export default TaskDetail;
