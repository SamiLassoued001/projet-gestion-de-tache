
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import UpdatedTask from "./UpdateTask";
import { Link } from "react-router-dom";

const columnColors = {
  todo: "#f0f4ff",
  inProgress: "#fff8e1",
  done: "#e8f5e9",
};

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({});
  const [editTaskData, setEditTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const refreshTasks = async () => {
    try {
      const userId = user?._id;
      const response = await axios.get(`http://localhost:5000/task/user/${userId}`);
      const rawTasks = response.data.data || [];

      const grouped = rawTasks.reduce((acc, task) => {
        const cat = task.category || "todo";
        if (!acc[cat]) {
          acc[cat] = { title: cat, items: [] };
        }
        acc[cat].items.push(task);
        return acc;
      }, {});

      const filteredGrouped = Object.fromEntries(
        Object.entries(grouped).filter(([_, group]) => group.items.length > 0)
      );

      setTasks(filteredGrouped);
    } catch (err) {
      console.error(err);
      // setError("Erreur lors du chargement des tâches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  useEffect(() => {
    socket.emit("fetchTasks");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const updateTasks = (data) => {
      const filtered = Object.fromEntries(
        Object.entries(data).filter(([_, group]) => group.items.length > 0)
      );
      setTasks(filtered);
    };

    socket.on("tasks", updateTasks);
    return () => socket.off("tasks", updateTasks);
  }, [socket]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId))
      return;
    socket.emit("taskDragged", { source, destination });
  };

  const handleEditTask = (category, taskId) => {
    const task = tasks[category]?.items.find((task) => task._id === taskId);
    if (task) {
      setEditTaskData({ category, taskId, ...task });
    }
  };

  const handleDeleteTask = async (category, taskId) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      try {
        await axios.delete(`http://localhost:5000/task/tasks/${taskId}`);
        await refreshTasks(); // recharge les tâches
        socket.emit("deleteTask", { category, taskId });
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading && <Typography>Chargement...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

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
          {Object.entries(tasks)
            .filter(([_, group]) => group.items.length > 0) // ✅ filtre ici aussi
            .map(([key, task]) => (
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
                      {task?.items?.map((item, index) => {
                        const isAssignedToUser = item.assignedUser === user?._id;

                        return (
                          <Draggable key={item._id} draggableId={String(item._id)} index={index}>
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  display: isAssignedToUser ? "block" : "none",
                                  padding: 2,
                                  margin: 1,
                                }}
                              >
                                {isAssignedToUser && (
                                  <>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      {item.title}
                                    </Typography>
                                    <Typography variant="body2">{item.content}</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                      Créée le : {item.date}
                                    </Typography>

                                    <Divider sx={{ my: 1 }} />

                                    {Array.isArray(item.comments) && item.comments.length > 0 ? (
                                      item.comments.map((c, i) => (
                                        <Typography key={c._id || i} variant="body2">
                                          <strong>{c.name}:</strong> {c.text}
                                        </Typography>
                                      ))
                                    ) : (
                                      <Typography variant="body2">Aucun commentaire</Typography>
                                    )}

                                    <Box mt={1}>
                                      <Link to={`/comments/${key}/${item._id}`}>
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
                                        onClick={() => handleEditTask(key, item._id)}
                                      >
                                        ✏ Modifier
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteTask(key, item._id)}
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
