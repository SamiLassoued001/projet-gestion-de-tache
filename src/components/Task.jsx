import AddTask from "./AddTask.jsx";
import TasksContainer from "./TasksContainer.jsx";
import Nav from "./Nav.jsx";
import socketIO from "socket.io-client";
import AppLayout from "./AppLayout.jsx";

// Connexion correcte au serveur WebSocket
const socket = socketIO.connect("http://localhost:5000");

const Task = () => {
  return (
    <AppLayout>
    <div>
      <Nav />
      <AddTask socket={socket} />
      <TasksContainer socket={socket} />
    </div>
    </AppLayout>
  );
};

export default Task;
