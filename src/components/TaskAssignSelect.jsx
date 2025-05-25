import { useState, useEffect } from "react";
import axios from "axios";

const TaskAssignSelect = ({ assignedUserId, onChange }) => {
  const [users, setUsers] = useState([]);
  const [tasksByUser, setTasksByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndTasks = async () => {
      try {
        setLoading(true);
        const usersRes = await axios.get("http://localhost:5000/user");
        const users = usersRes.data;
        setUsers(users);

        // Charger les tâches pour chaque utilisateur
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
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <select
      value={assignedUserId || ""}
      onChange={(e) => onChange(e.target.value)}
      name="assignedUser"
      aria-label="Sélectionner un utilisateur assigné"
    >
      <option value="">Aucun assigné</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name || user.email} ({tasksByUser[user._id]?.length || 0} tâches)
        </option>
      ))}
    </select>
  );
};

export default TaskAssignSelect;
