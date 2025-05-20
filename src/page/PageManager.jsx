import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import AppLayout from "../components/AppLayout";
import Head from "../components/Head";

const PageManager = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTasks, setNewTasks] = useState({});
  const [editingTaskId, setEditingTaskId] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      // Filtrer uniquement les utilisateurs avec le rôle "manager"
      const managers = res.data.data.filter(user => user.role === "user");
      setUsers(managers);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };
  

  const fetchTasks = async (userId) => {
    const res = await axios.get(`http://localhost:5000/cheftasks/user/${userId}`);
    setTasks((prev) => ({ ...prev, [userId]: res.data.data }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (userId, field, value) => {
    setNewTasks((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }));
  };

 const createOrUpdateTask = async (user) => {
  const { title, startDate, endDate } = newTasks[user._id] || {};
  const taskId = editingTaskId[user._id];

  if (!title || !startDate || !endDate) {
    alert("Tous les champs doivent être remplis.");
    return;
  }

  // Vérifie si la date de début est avant la date de fin
  if (new Date(startDate) > new Date(endDate)) {
    alert("La date de début doit être avant la date de fin.");
    return;
  }

  try {
    if (taskId) {
      await axios.put(`http://localhost:5000/cheftasks/${taskId}`, {
        title,
        startDate,
        endDate,
      });
    } else {
      await axios.post("http://localhost:5000/cheftasks", {
        title,
        startDate,
        endDate,
        userId: user._id,
        userName: user.name,
      });
    }

    fetchTasks(user._id);
    setNewTasks((prev) => ({ ...prev, [user._id]: {} }));
    setEditingTaskId((prev) => ({ ...prev, [user._id]: null }));
  } catch (err) {
    alert("Erreur lors de la création/mise à jour de la tâche.");
    console.error(err);
  }
};


  const deleteTask = async (taskId, userId) => {
    await axios.delete(`http://localhost:5000/cheftasks/${taskId}`);
    fetchTasks(userId);
  };

  const editTask = (userId, task) => {
    setNewTasks((prev) => ({
      ...prev,
      [userId]: {
        title: task.title,
        startDate: task.startDate.slice(0, 10),
        endDate: task.endDate.slice(0, 10),
      },
    }));
    setEditingTaskId((prev) => ({ ...prev, [userId]: task._id }));
  };

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head title="Gestion des tâches" subTitle="Créer et gérer les tâches par utilisateur" align="left" />
        {users.map((user) => (
          <Box key={user._id} sx={{ border: "1px solid #ccc", p: 2, my: 2, borderRadius: 2 }}>
            <Typography variant="h6">{user.name}</Typography>

            <Box display="flex" gap={2} my={1}>
              <TextField
                label="Nom de la tâche"
                value={newTasks[user._id]?.title || ""}
                onChange={(e) => handleInputChange(user._id, "title", e.target.value)}
              />
              <TextField
                type="date"
                label="Date de début"
                InputLabelProps={{ shrink: true }}
                value={newTasks[user._id]?.startDate || ""}
                onChange={(e) => handleInputChange(user._id, "startDate", e.target.value)}
              />
              <TextField
                type="date"
                label="Date de fin"
                InputLabelProps={{ shrink: true }}
                value={newTasks[user._id]?.endDate || ""}
                onChange={(e) => handleInputChange(user._id, "endDate", e.target.value)}
              />
              <Button variant="contained" onClick={() => createOrUpdateTask(user)}>
                {editingTaskId[user._id] ? "Enregistrer" : "Créer"}
              </Button>
              <Button variant="outlined" onClick={() => fetchTasks(user._id)}>Afficher les tâches</Button>
            </Box>

            {(tasks[user._id] || []).map((task) => (
              <Box key={task._id} display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 1, border: "1px solid #ddd", p: 1, borderRadius: 1 }}>
                <Box>
                  <Typography><strong>{task.title}</strong></Typography>
                  <Typography variant="body2">🗓 {task.startDate.slice(0, 10)} → {task.endDate.slice(0, 10)}</Typography>
                  <Typography variant="body2">👤 {task.userName}</Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Button size="small" color="primary" variant="contained" onClick={() => editTask(user._id, task)}>
                    Modifier
                  </Button>
                  <Button size="small" color="error" variant="contained" onClick={() => deleteTask(task._id, user._id)}>
                    Supprimer
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </AppLayout>
  );
};

export default PageManager;
