import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import UpdatedTask from "./UpdateTask";
import axios from "axios";
import { Link } from "react-router-dom";  // Assure-toi que cet import est ici !

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState({});
  const [editTaskData, setEditTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les tâches via l'API initialement
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/task/task");
        console.log("Réponse API get /task :", response.data);
        setTasks(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des tâches :", err);
        setError("Erreur lors du chargement des tâches.");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  // Mise à jour des tâches via WebSocket
  useEffect(() => {
    if (!socket) return;

    const updateTasks = (data) => {
      console.log("Tâches reçues via WebSocket :", data);
      setTasks(data);
    };

    socket.on("tasks", updateTasks); // Ecoute les mises à jour de tâches via WebSocket

    return () => {
      socket.off("tasks", updateTasks); // Nettoyage à la déconnexion
    };
  }, [socket]);

  // Fonction de gestion du drag and drop
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (destination.index === source.index && destination.droppableId === source.droppableId)
      return;

    socket.emit("taskDragged", { source, destination });
  };

  // Fonction pour éditer une tâche
  const handleEditTask = (category, taskId) => {
    const task = tasks[category]?.items.find((task) => task.id === taskId);
    if (!task) return;

    setEditTaskData({
      category,
      taskId,
      ...task,
    });
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async (category, taskId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        // Suppression via API (dans MongoDB)
        await axios.delete(`http://localhost:5000/task/tasks/${taskId}`);  
        // Mise à jour locale de l'état (optimiste)
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks[category].items = updatedTasks[category].items.filter(
            (task) => task._id !== taskId
          );
          return updatedTasks;
        });
  
        // Notification aux autres via WebSocket
        socket.emit("deleteTask", { category, taskId });
  
        console.log("✅ Tâche supprimée avec succès !");
      } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression de la tâche.");
      }
    }
  };

  return (
    <div className="container">
      {loading && <p>Chargement des tâches...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {editTaskData && (
        <UpdatedTask
          editTaskData={editTaskData}
          setEditTaskData={setEditTaskData}
          setTasks={setTasks}
          socket={socket}
        />
      )}

      {!loading && !error && (
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(tasks).map(([key, task]) => (
            <div className={`${key}__wrapper`} key={key}>
              <h3>{task?.title || key}</h3>
              <div className={`${key}__container`}>
                <Droppable droppableId={key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-area"
                    >
                      {task?.items?.length > 0 ? (
                        task.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${key}__items`}
                              >
                                <div className="task-item">
                                  <p>
                                    <strong>Title:</strong> {item.title}
                                  </p>
                                  <p>
                                    <strong>Contenu:</strong> {item.content}
                                  </p>
                                  <p>
                                    <strong>Date de création:</strong> {item.date}
                                  </p>

                                  {Array.isArray(item.comments) &&
                                  item.comments.length > 0 ? (
                                    <div className="comments-section">
                                      {item.comments.map((comment, idx) => (
                                        <div
                                          key={comment._id || `${item.id}-comment-${idx}`}
                                          className="comment"
                                        >
                                          <strong>{comment.name}:</strong> {comment.text}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p>Aucun commentaire</p>
                                  )}

                                  <p className="comment">
                                    <Link to={`/comments/${key}/${item.id}`}>
                                      {item.comments && item.comments.length > 0
                                        ? `Voir les commentaires (${item.comments.length})`
                                        : "Ajouter un commentaire"}
                                    </Link>
                                  </p>

                                  <button
                                    onClick={() => handleEditTask(key, item.id)}
                                    className="edit-btn"
                                  >
                                    ✏ Modifier
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTask(key, item.id)}
                                    className="delete"
                                  >
                                    🗑 Supprimer
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (
                        <p className="empty">Aucune tâche ici.</p>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      )}
    </div>
  );
};

export default TasksContainer;
