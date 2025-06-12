// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
// import AppLayout from "../components/AppLayout";
// import Head from "../components/Head";

// const PageManager = () => {
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState({}); // tâches par userId
//   const [newTasks, setNewTasks] = useState({});
//   const [isDetailsVisible, setIsDetailsVisible] = useState({});
//   const [editingTaskId, setEditingTaskId] = useState(null); // id de tâche en édition
//   const [editTaskData, setEditTaskData] = useState({}); // données de la tâche en édition

//   const toggleDetails = async (userId) => {
//     const currentlyVisible = isDetailsVisible[userId];
//     setIsDetailsVisible(prev => ({
//       ...prev,
//       [userId]: !currentlyVisible
//     }));
//     if (!currentlyVisible) {
//       await fetchTasks(userId);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/users");
//       const managers = res.data.data.filter(user => user.role === "user");
//       setUsers(managers);
//     } catch (err) {
//       console.error("Erreur lors de la récupération des utilisateurs", err);
//     }
//   };

//   const fetchTasks = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/task/user/${userId}`);
//       setTasks((prev) => ({ ...prev, [userId]: res.data.data }));
//     } catch (err) {
//       console.error("Erreur lors de la récupération des tâches", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleInputChange = (userId, field, value) => {
//     setNewTasks((prev) => ({
//       ...prev,
//       [userId]: {
//         ...prev[userId],
//         [field]: value,
//       },
//     }));
//   };

//   const createOrUpdateTask = async (user) => {
//     const { title, content, date } = newTasks[user._id] || {};

//     if (!title || !content || !date) {
//       alert("Tous les champs doivent être remplis.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/task", {
//         id: user._id + Date.now(),
//         title,
//         content,
//         date: new Date(date).toISOString(),
//         status: "pending",
//         assignedUser: { _id: user._id },
//       });

//       alert("Tâche créée avec succès !");
//       setNewTasks((prev) => ({ ...prev, [user._id]: {} }));
//       await fetchTasks(user._id);
//     } catch (err) {
//       alert("Erreur lors de la création de la tâche.");
//       console.error(err);
//     }
//   };

//   // ---- MODIFIER une tâche ----
//   const startEditing = (task) => {
//     setEditingTaskId(task._id);
//     setEditTaskData({
//       title: task.title,
//       content: task.content,
//       date: task.date?.slice(0, 10) || "",
//       status: task.status,
//       assignedUser: task.assignedUser || {},
//     });
//   };

//   const cancelEditing = () => {
//     setEditingTaskId(null);
//     setEditTaskData({});
//   };

//   const handleEditChange = (field, value) => {
//     setEditTaskData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const saveEdit = async (userId) => {
//     if (!editTaskData.title || !editTaskData.content || !editTaskData.date) {
//       alert("Tous les champs doivent être remplis.");
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/task/tasks/${editingTaskId}`, {
//         title: editTaskData.title,
//         content: editTaskData.content,
//         date: new Date(editTaskData.date).toISOString(),
//         status: editTaskData.status,
//       });
//       alert("Tâche modifiée avec succès !");
//       setEditingTaskId(null);
//       setEditTaskData({});
//       await fetchTasks(userId);
//     } catch (err) {
//       alert("Erreur lors de la modification de la tâche.");
//       console.error(err);
//     }
//   };

//   // ---- SUPPRIMER une tâche ----
//   const deleteTask = async (taskId, userId) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/task/tasks/${taskId}`);
//       alert("Tâche supprimée !");
//       await fetchTasks(userId);
//     } catch (err) {
//       alert("Erreur lors de la suppression.");
//       console.error(err);
//     }
//   };

//   return (
//     <AppLayout>
//       <Box sx={{ p: 3 }}>
//         <Head
//           title="Gestion des tâches"
//           subTitle="Créer et gérer les tâches par utilisateur"
//           align="left"
//         />
//         {users.map((user) => (
//           <Box
//             key={user._id}
//             sx={{ border: "1px solid #ccc", p: 2, my: 2, borderRadius: 2 }}
//           >
//             <Typography variant="h6">{user.name}</Typography>

//             <Box display="flex" flexWrap="wrap" gap={2} my={1}>
//               <TextField
//                 label="Titre"
//                 value={newTasks[user._id]?.title || ""}
//                 onChange={(e) => handleInputChange(user._id, "title", e.target.value)}
//               />
//               <TextField
//                 label="Description"
//                 value={newTasks[user._id]?.content || ""}
//                 onChange={(e) => handleInputChange(user._id, "content", e.target.value)}
//               />
//               <TextField
//                 type="date"
//                 label="Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={newTasks[user._id]?.date || ""}
//                 onChange={(e) => handleInputChange(user._id, "date", e.target.value)}
//               />
//               <Button variant="contained" onClick={() => createOrUpdateTask(user)}>
//                 Créer
//               </Button>
//               <Button variant="outlined" onClick={() => toggleDetails(user._id)}>
//                 {isDetailsVisible[user._id] ? "Masquer les tâches" : "Afficher les tâches"}
//               </Button>
//             </Box>

//             {isDetailsVisible[user._id] && (
//               <>
//                 {(tasks[user._id] && tasks[user._id].length > 0) ? (
//                   tasks[user._id].map((task) => (
//                     <Box
//                       key={task._id}
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="space-between"
//                       sx={{ mt: 1, border: "1px solid #ddd", p: 1, borderRadius: 1 }}
//                     >
//                       {editingTaskId === task._id ? (
//                         // Formulaire d'édition inline
//                         <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
//                           <TextField
//                             label="Titre"
//                             value={editTaskData.title}
//                             onChange={(e) => handleEditChange("title", e.target.value)}
//                             size="small"
//                           />
//                           <TextField
//                             label="Description"
//                             value={editTaskData.content}
//                             onChange={(e) => handleEditChange("content", e.target.value)}
//                             size="small"
//                           />
//                           <TextField
//                             type="date"
//                             label="Date"
//                             InputLabelProps={{ shrink: true }}
//                             value={editTaskData.date}
//                             onChange={(e) => handleEditChange("date", e.target.value)}
//                             size="small"
//                           />
//                           <Select
//                             label="Statut"
//                             value={editTaskData.status}
//                             onChange={(e) => handleEditChange("status", e.target.value)}
//                             size="small"
//                           >
//                             <MenuItem value="pending">Pending</MenuItem>
//                             <MenuItem value="ongoing">Ongoing</MenuItem>
//                             <MenuItem value="completed">Completed</MenuItem>
//                           </Select>
//                           <Box>
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               onClick={() => saveEdit(user._id)}
//                               sx={{ mr: 1 }}
//                             >
//                               Enregistrer
//                             </Button>
//                             <Button variant="outlined" onClick={cancelEditing}>
//                               Annuler
//                             </Button>
//                           </Box>
//                         </Box>
//                       ) : (
//                         <>
//                           <Box>
//                             <Typography><strong>{task.title}</strong></Typography>
//                             <Typography variant="body2">📅 {task.date?.slice(0, 10)}</Typography>
//                             <Typography
//                               style={{
//                                 borderRadius: 20,
//                                 textAlign: "center",
//                                 padding: 5,
//                                 paddingRight: 10,
//                                 backgroundColor:
//                                   task.status === "pending"
//                                     ? "rgb(192, 192, 192)"
//                                     : task.status === "ongoing"
//                                     ? "rgb(88, 185, 233)"
//                                     : "rgb(61, 242, 15)",
//                               }}
//                               variant="body2"
//                             >
//                               🔖 {task.status}
//                             </Typography>
//                             <Typography variant="body2">👤 {user.name}</Typography>
//                           </Box>
//                           <Box>
//                             <Button
//                               size="small"
//                               variant="outlined"
//                               sx={{ mr: 1 }}
//                               onClick={() => startEditing(task)}
//                             >
//                               Modifier
//                             </Button>
//                             <Button
//                               size="small"
//                               variant="outlined"
//                               color="error"
//                               onClick={() => deleteTask(task._id, user._id)}
//                             >
//                               Supprimer
//                             </Button>
//                           </Box>
//                         </>
//                       )}
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                     Aucune tâche pour cet utilisateur.
//                   </Typography>
//                 )}
//               </>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </AppLayout>
//   );
// };

// export default PageManager;


import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import AppLayout from "../components/AppLayout";
import Head from "../components/Head";
import socket from "../socket"; // ✅ import de socket

const PageManager = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTasks, setNewTasks] = useState({});
  const [isDetailsVisible, setIsDetailsVisible] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({});

  const toggleDetails = async (userId) => {
    const currentlyVisible = isDetailsVisible[userId];
    setIsDetailsVisible(prev => ({
      ...prev,
      [userId]: !currentlyVisible
    }));
    if (!currentlyVisible) {
      await fetchTasks(userId);
    }
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
      const res = await axios.get(`http://localhost:5000/task/user/${userId}`);
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

    if (!title || !content || !date) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/task", {
        id: user._id + Date.now(),
        title,
        content,
        date: new Date(date).toISOString(),
        status: "pending",
        assignedUser: { _id: user._id },
      });

      // ✅ envoyer notification via socket.io
      socket.emit("new-notification", {
        userId: user._id,
        message: `Nouvelle tâche assignée : "${title}"`,
      });

      alert("Tâche créée avec succès !");
      setNewTasks((prev) => ({ ...prev, [user._id]: {} }));
      await fetchTasks(user._id);
    } catch (err) {
      alert("Erreur lors de la création de la tâche.");
      console.error(err);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTaskData({
      title: task.title,
      content: task.content,
      date: task.date?.slice(0, 10) || "",
      status: task.status,
      assignedUser: task.assignedUser || {},
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTaskData({});
  };

  const handleEditChange = (field, value) => {
    setEditTaskData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEdit = async (userId) => {
    if (!editTaskData.title || !editTaskData.content || !editTaskData.date) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/task/tasks/${editingTaskId}`, {
        title: editTaskData.title,
        content: editTaskData.content,
        date: new Date(editTaskData.date).toISOString(),
        status: editTaskData.status,
      });
      alert("Tâche modifiée avec succès !");
      setEditingTaskId(null);
      setEditTaskData({});
      await fetchTasks(userId);
    } catch (err) {
      alert("Erreur lors de la modification de la tâche.");
      console.error(err);
    }
  };

  const deleteTask = async (taskId, userId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) return;

    try {
      await axios.delete(`http://localhost:5000/task/tasks/${taskId}`);
      alert("Tâche supprimée !");
      await fetchTasks(userId);
    } catch (err) {
      alert("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head
          title="Gestion des tâches"
          subTitle="Créer et gérer les tâches par utilisateur"
          align="left"
        />
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
              <Button variant="contained" onClick={() => createOrUpdateTask(user)}>
                Créer
              </Button>
              <Button variant="outlined" onClick={() => toggleDetails(user._id)}>
                {isDetailsVisible[user._id] ? "Masquer les tâches" : "Afficher les tâches"}
              </Button>
            </Box>

            {isDetailsVisible[user._id] && (
              <>
                {(tasks[user._id] && tasks[user._id].length > 0) ? (
                  tasks[user._id].map((task) => (
                    <Box
                      key={task._id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mt: 1, border: "1px solid #ddd", p: 1, borderRadius: 1 }}
                    >
                      {editingTaskId === task._id ? (
                        <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
                          <TextField
                            label="Titre"
                            value={editTaskData.title}
                            onChange={(e) => handleEditChange("title", e.target.value)}
                            size="small"
                          />
                          <TextField
                            label="Description"
                            value={editTaskData.content}
                            onChange={(e) => handleEditChange("content", e.target.value)}
                            size="small"
                          />
                          <TextField
                            type="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            value={editTaskData.date}
                            onChange={(e) => handleEditChange("date", e.target.value)}
                            size="small"
                          />
                          <Select
                            label="Statut"
                            value={editTaskData.status}
                            onChange={(e) => handleEditChange("status", e.target.value)}
                            size="small"
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                          <Box>
                            <Button variant="contained" color="primary" onClick={() => saveEdit(user._id)} sx={{ mr: 1 }}>
                              Enregistrer
                            </Button>
                            <Button variant="outlined" onClick={cancelEditing}>
                              Annuler
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <>
                          <Box>
                            <Typography><strong>{task.title}</strong></Typography>
                            <Typography variant="body2">📅 {task.date?.slice(0, 10)}</Typography>
                            <Typography
                              style={{
                                borderRadius: 20,
                                textAlign: "center",
                                padding: 5,
                                paddingRight: 10,
                                backgroundColor:
                                  task.status === "pending"
                                    ? "rgb(192, 192, 192)"
                                    : task.status === "ongoing"
                                    ? "rgb(88, 185, 233)"
                                    : "rgb(61, 242, 15)",
                              }}
                              variant="body2"
                            >
                              🔖 {task.status}
                            </Typography>
                            <Typography variant="body2">👤 {user.name}</Typography>
                          </Box>
                          <Box>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ mr: 1 }}
                              onClick={() => startEditing(task)}
                            >
                              Modifier
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => deleteTask(task._id, user._id)}
                            >
                              Supprimer
                            </Button>
                          </Box>
                        </>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Aucune tâche pour cet utilisateur.
                  </Typography>
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
    </AppLayout>
  );
};

export default PageManager;
