import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import AppLayout from "../components/AppLayout";
import Head from "../components/Head";

const PageManager = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});
  const [taskUser, setTaskUser] = useState({});
  const [newTasks, setNewTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [isDetailsVisible, setIsDetailsVisible] = useState({});

// Fonction pour toggle la visibilité d’un user donné
const toggleDetails = (userId) => {
  setIsDetailsVisible(prev => ({
    ...prev,
    [userId]: !prev[userId] // inverse la valeur actuelle (true/false)
  }));
};
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      const managers = res.data.data.filter(user => user.role === "user");
      setUsers(managers);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs", err);
    }
  };

  const fetchTasks = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/cheftasks/user/${userId}`);
      setTasks((prev) => ({ ...prev, [userId]: res.data.data }));
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches", err);
    }
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
    const { title, content, date } = newTasks[user._id] || {};
console.log("ussss",user);

    if (!title || !content || !date   ) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/task", {
        id: user._id + Date.now(), // Simule un ID unique si nécessaire
        title,
        content,
        date: new Date(date).toISOString(),
        status: "pending",
        assignedUser: {
          _id: user._id,
        },
      });
      

      alert("Tâche créée avec succès !");
      setNewTasks((prev) => ({ ...prev, [user._id]: {} }));
      fetchTasks(user._id);
    } catch (err) {
      alert("Erreur lors de la création de la tâche.");
      console.error(err);
    }
  };
    const user = JSON.parse(localStorage.getItem("user"));
  
    const fetchTasksUser = async () => {
      try {
        
        const res = await axios.get(`http://localhost:5000/task/user/${user?._id}`);
        console.log("API Response:", res.data.data); // debug
        setTaskUser(res.data.data); // ici on stocke le tableau complet
      } catch (err) {
        console.error("API Error:", err);
        setError("Erreur lors de la récupération des tâches.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchTasksUser();
    }, []);

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head title="Gestion des tâches" subTitle="Créer et gérer les tâches par utilisateur" align="left" />
        {users.map((user) => (
          <Box key={user._id} sx={{ border: "1px solid #ccc", p: 2, my: 2, borderRadius: 2 }}>
            <Typography variant="h6">{user.name}</Typography>

            <Box display="flex" flexWrap="wrap" gap={2} my={1}>
              <TextField
                label="Titre"
                value={newTasks[user._id]?.title || ""}
                onChange={(e) => handleInputChange(user._id, "title", e.target.value)}
              />
              
              <TextField
                label="Description"
                value={newTasks[user._id]?.content || ""}
                onChange={(e) => handleInputChange(user._id, "content", e.target.value)}
              />
              <TextField
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={newTasks[user._id]?.date || ""}
                onChange={(e) => handleInputChange(user._id, "date", e.target.value)}
              />
              
              {/* <TextField
                label="Statut"
                value={newTasks[user._id]?.status || ""}
                onChange={(e) => handleInputChange(user._id, "status", e.target.value)}
              /> */}
              <Button variant="contained" onClick={() => createOrUpdateTask(user)}>
                Créer
              </Button>
              <Button variant="outlined" onClick={() => toggleDetails(user._id)}>Afficher les tâches</Button>
            </Box>

            {isDetailsVisible[user._id] && taskUser.map((task) => (
  <Box
    key={task._id}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    sx={{ mt: 1, border: "1px solid #ddd", p: 1, borderRadius: 1 }}
  >
    <Box>
      <Typography><strong>{task.title}</strong></Typography>
      <Typography variant="body2">📅 {task.date?.slice(0, 10)}</Typography>
      <Typography style={{borderRadius:20, textAlign:"center", padding:5,paddingRight:10,backgroundColor:task.status === "pending" ? "rgb(192, 192, 192)" :task.status === "ongoing" ? "rgb(88, 185, 233)": "rgb(61, 242, 15)"}} variant="body2">🔖 {task.status}</Typography>
      <Typography variant="body2">👤 {user.name}</Typography>
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
