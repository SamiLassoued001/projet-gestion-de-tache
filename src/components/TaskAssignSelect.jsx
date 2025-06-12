import { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";

const TaskAssignSelect = ({ assignedUserId, onChange }) => {
  const [users, setUsers] = useState([]);
  const [tasksByUser, setTasksByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const isManager = user?.role === "manager";

  useEffect(() => {
    if (!isManager) return;

    const fetchUsersAndTasks = async () => {
      try {
        setLoading(true);
        const usersRes = await axios.get("http://localhost:5000/user");
        const users = usersRes.data;
        setUsers(users);

        const tasksPromises = users.map(async (user) => {
          try {
            const tasksRes = await axios.get(`http://localhost:5000/cheftasks/user/${user._id}`);
            return { userId: user._id, tasks: tasksRes.data.data };
          } catch (err) {
            console.error(`Erreur lors de la récupération des tâches pour l'utilisateur ${user._id}`);
            return { userId: user._id, tasks: [] };
          }
        });

        const tasksResults = await Promise.all(tasksPromises);
        const tasksMap = {};
        tasksResults.forEach(({ userId, tasks }) => {
          tasksMap[userId] = tasks;
        });

        setTasksByUser(tasksMap);
        setError(null);
      } catch (err) {
        console.error("Erreur récupération utilisateurs", err);
        setError("Impossible de charger les utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndTasks();
  }, [isManager]);

  if (!isManager) return null;

  if (loading) return <CircularProgress size={24} />;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
      <InputLabel id="assigned-user-label">Assigné à</InputLabel>
      <Select
        labelId="assigned-user-label"
        value={assignedUserId || ""}
        label="Assigné à"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">
          <em>Non assigné</em>
        </MenuItem>
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.name || user.email} ({tasksByUser[user._id]?.length || 0} tâche(s))
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskAssignSelect;


