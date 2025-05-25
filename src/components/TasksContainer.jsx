import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import UpdatedTask from "./UpdateTask";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const columnColors = {
  todo: "#f0f4ff",
  inProgress: "#fff8e1",
  done: "#e8f5e9",
};

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({});
  const [task, setTask] = useState({});
  const [users, setUsers] = useState([]); // 1. Liste utilisateurs
  const [editTaskData, setEditTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Récupérer les tâches
  async function fetchTasks() {
    try {
      const response = await axios.get(`http://localhost:5000/task/task`);
      const resTask = await axios.get(
        `http://localhost:5000/task/user/${user?._id}`
      );
      setTasks(response);
      setTask(resTask.data);
    } catch (err) {
      console.error("Erreur lors du chargement des tâches :", err);
      setError("Erreur lors du chargement des tâches.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  // Récupérer la liste des utilisateurs (manager -> users)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:5000/user"); // Adapter selon ton endpoint
        setUsers(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.emit("fetchTasks");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const updateTasks = (data) => {
      setTasks(data);
    };
    socket.on("tasks", updateTasks);
    return () => {
      socket.off("tasks", updateTasks);
    };
  }, [socket]);

  const handleDragEnd = ({ destination, source }) => {
    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    )
      return;
    socket.emit("taskDragged", { source, destination });
  };

  const handleEditTask = (category, taskId) => {
    const task = tasks[category]?.items.find((task) => task.id === taskId);
    if (task) {
      setEditTaskData({ category, taskId, ...task });
    }
  };

  const handleDeleteTask = async (category, taskId) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      try {
        await axios.delete(`http://localhost:5000/task/tasks/${taskId}`);
        setTasks((prev) => {
          const updated = { ...prev };
          updated[category].items = updated[category].items.filter(
            (task) => task._id !== taskId
          );
          return updated;
        });
        socket.emit("deleteTask", { category, taskId });
      } catch (err) {
        alert("erreur:", err);
      }
    }
  };

  // 3. Gestion du changement assignation utilisateur
  const handleUserChange = async (taskId, newUserId) => {
    try {
      await axios.put(`http://localhost:5000/task/tasks/${taskId}`, {
        userId: newUserId,
      });

      // Mise à jour locale
      setTasks((prev) => {
        const updated = { ...prev };
        for (const category in updated) {
          updated[category].items = updated[category].items.map((task) => {
            if (task.id === taskId) {
              return { ...task, assignedUser: newUserId };
            }
            return task;
          });
        }
        return updated;
      });

      // Re-synchroniser via WebSocket
      socket.emit("fetchTasks");
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'utilisateur", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading && <Typography>Chargement...</Typography>}

      {editTaskData && (
        <UpdatedTask
          editTaskData={editTaskData}
          setEditTaskData={setEditTaskData}
          setTasks={setTasks}
          socket={socket}
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack direction="row" spacing={2}>
          {Object.entries(tasks).map(([key, task]) => (
            <Box
              key={key}
              sx={{
                flex: 1,
                backgroundColor: columnColors[key] || "#f5f5f5",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                minHeight: "400px",
              }}
            >
              <Typography variant="h6" mb={2}>
                {task?.title || key}
              </Typography>

              <Droppable droppableId={key}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ minHeight: "100px" }}
                  >
                    {task?.items?.length > 0 &&
                      task.items
                        //  .filter(item => item.assignedUser === user?._id)
                        .map((item, index) => {
                          const isAssignedToUser =
                            item.assignedUser === user?._id;

                          return (
                            <Draggable
                              key={item.id}
                              draggableId={String(item.id)}
                              index={index}
                            >
                              {(provided) => (
                                <Paper
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    display: isAssignedToUser
                                      ? "block"
                                      : "none",
                                    padding: 2,
                                    margin: 1,
                                  }}
                                >
                                  {isAssignedToUser && (
                                    <>
                                      <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                      >
                                        {item.title}
                                      </Typography>
                                      <Typography variant="body2">
                                        {item.content}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        Créée le : {item.date}
                                      </Typography>

                                      {/* 2. Select assignation utilisateur */}
                                      <FormControl
                                        fullWidth
                                        size="small"
                                        sx={{ mt: 1 }}
                                      >
                                        <InputLabel
                                          id={`assign-user-label-${item.id}`}
                                        >
                                          Assigné à
                                        </InputLabel>
                                        <Select
                                          labelId={`assign-user-label-${item.id}`}
                                          value={item.assignedUser || ""}
                                          label="Assigné à"
                                          onChange={(e) =>
                                            handleUserChange(
                                              item?.id,
                                              e.target.value
                                            )
                                          }
                                        >
                                          <MenuItem value="">
                                            <em>Non assigné</em>
                                          </MenuItem>
                                          {users.map((user) => (
                                            <MenuItem
                                              key={user._id}
                                              value={user._id}
                                            >
                                              {user.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>

                                      <Divider sx={{ my: 1 }} />

                                      {Array.isArray(item.comments) &&
                                      item.comments.length > 0 ? (
                                        item.comments.map((c, i) => (
                                          <Typography
                                            key={c._id || i}
                                            variant="body2"
                                          >
                                            <strong>{c.name}:</strong> {c.text}
                                          </Typography>
                                        ))
                                      ) : (
                                        <Typography variant="body2">
                                          Aucun commentaire
                                        </Typography>
                                      )}

                                      <Box mt={1}>
                                        <Link
                                          to={`/comments/${key}/${item.id}`}
                                        >
                                          <Button variant="text" size="small">
                                            {item.comments?.length > 0
                                              ? `Commentaires (${item.comments.length})`
                                              : "Ajouter un commentaire"}
                                          </Button>
                                        </Link>
                                      </Box>

                                      <Stack direction="row" spacing={1} mt={1}>
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          size="small"
                                          onClick={() =>
                                            handleEditTask(key, item.id)
                                          }
                                        >
                                          ✏ Modifier
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="error"
                                          size="small"
                                          onClick={() =>
                                            handleDeleteTask(key, item.id)
                                          }
                                        >
                                          🗑 Supprimer
                                        </Button>
                                      </Stack>
                                    </>
                                  )}
                                </Paper>
                              )}
                            </Draggable>
                          );
                        })}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Stack>
      </DragDropContext>
    </Box>
  );
};

export default TasksContainer;
