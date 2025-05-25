import { useState } from "react";
import AddTask from "./AddTask.jsx";
import TasksContainer from "./TasksContainer.jsx";
import Nav from "./Nav.jsx";
import socketIO from "socket.io-client";
import AppLayout from "./AppLayout.jsx";

const socket = socketIO.connect("http://localhost:5000");

const Task = () => {
  const [currentTitle, setCurrentTitle] = useState("Kanban Board");

  return (
    <AppLayout>
      <Nav title={currentTitle} />
      <AddTask socket={socket} />
      <TasksContainer socket={socket} setCurrentTitle={setCurrentTitle} />
    </AppLayout>
  );
};

export default Task;
