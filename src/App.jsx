// @ts-nocheck
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
//import AppSide from "./components/AppSide";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Automation from "./components/Automation";
import Planner from "./components/Planner";
import Standars from "./components/Standars";
import Proffessionaloffre from "./components/Proffessionaloffre";
import Premium from "./components/Premium";
import AppPricing from "./components/AppPricing";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
// import Header from "./components/Header";
import { BarChart, Calendar, Kanban } from "lucide-react";
import Views from "./components/Views";
import EquipementsMarketing from "./components/EquipementsMarketing";
import StartUps from "./components/StartUps";
import GestiondeProduit from "./components/GestiondeProduit";
import Task from "./components/Task";
import Comments from "./components/Comments";
import AddTask from "./components/AddTask";
import UpdatedTask from "./components/UpdateTask";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PageAdmin from "./page/PageAdmin";
// import PageUser from "./page/PageUser";
import PageManager  from "./page/PageManager";

 import PlannerMeeting from './components/PlannerMeeting'
import Team from "./components/Team";
import Dashboards from "./page/Dashboards";
import TabManager from "./page/TabManager";
import TabUser from "./page/TabUser";
import TachesTraitees from "./page/TachesTraitees";
import PageAjoutUtilisateur from "./page/PageAjoutUtilisateur";
import HomeReception from "./page/HomeReception";
import RequireAdminAuth from "./components/RequireAdminAuth";
import { Bar } from "@nivo/bar";
import AppLayout from "./components/AppLayout";
import TaskAssignSelect from "./components/TaskAssignSelect";


function App() {
  return (
    <>
    
      {/* Header commun à toutes les pages */}
      {/* <Header /> */}
      <Routes>
      <Route path="/team" element={<Team/>} />
      <Route path="/calendar" element={<Calendar/>} />
      <Route path="/PageAjoutUtilisateur" element={<PageAjoutUtilisateur/>} />
      <Route path="/Bar" element={<Bar/>} />
      <Route path="/Barchart" element={<BarChart/>} />
      <Route path="/HomeReception" element={<HomeReception/>} />
      <Route path="/a" element={<RequireAdminAuth/>} />



      <Route path="/forgot" element={<ForgotPassword/>} />
      <Route path="/AppLayout" element={<AppLayout/>} />


      <Route path="/reset/:token" element={<ResetPassword/>} />
      <Route path="/admin" element={<PageAdmin/>} />
      {/* <Route path="/user" element={<PageUser/>} /> */}
      <Route path="/manager" element={<PageManager/>} />
      <Route path="/TabManager" element={<TabManager/>} />
      <Route path="/user" element={<TabUser/>} />
      <Route path="/TachesTraitees" element={<TachesTraitees/>} />
      <Route path="TaskAssignSelect" element={<TaskAssignSelect/>} />




      <Route path="PlannerMeeting" element={<PlannerMeeting/>} />

      <Route path="/comments/:category/:id" element={<Comments />} />
      <Route path="/AddTask/" element={<AddTask />} />
      <Route path="/UpdatedTask/:category/:id" element={<UpdatedTask />} />

      <Route path="/task" element={<Task />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/Views" element={<Views />} />
        <Route path="/EquipementsMarketing" element={<EquipementsMarketing />} />
        <Route path="/StartUps" element={<StartUps />} />
        <Route path="/GestiondeProduit" element={<GestiondeProduit />} />
        <Route path="/" element={<Home />} />
        <Route path="/Automation" element={<Automation />} />
        <Route path="/Planner" element={<Planner />} />
        <Route path="/Standars" element={<Standars />} />
        <Route path="/Proffessional" element={<Proffessionaloffre />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/AppPricing" element={<AppPricing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboards" element={<Dashboards />} />
      </Routes>
    </>
  );
}

export default App;
