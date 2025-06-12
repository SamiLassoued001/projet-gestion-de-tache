// IMPORTS (inchangés)
import React from "react";
import DashLine from "../page/DashLine";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import {
  HomeOutlined,
  PeopleOutlined,
  ReceiptOutlined,
  PersonOutlined,
  CalendarTodayOutlined,
  HelpOutlineOutlined,
  BarChartOutlined,
  PieChartOutlineOutlined,
  TimelineOutlined,
  MapOutlined,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MuiDrawer from "@mui/material/Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

// CONSTANTES
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(function ({ theme, open }) {
  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  };
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// STRUCTURE DES MENUS
const Array1 = [
  { text: "Dashboard", icon: <HomeOutlined />, path: "/Dashboards" },
  { text: "Gérer l'équipe", icon: <PeopleOutlined />, path: "/team" },
  { text: "Administration", icon: <ReceiptOutlined />, path: "/admin" },
];

const Array2 = [
  {
    text: "Créer un Profil",
    icon: <PersonOutlined />,
    path: "/PageAjoutUtilisateur",
  },
  // { text: "Calendrier", icon: <CalendarTodayOutlined />, path: "/PlannerMeeting" },
  // { text: "FAQ Page", icon: <HelpOutlineOutlined />, path: "/faq" },
];

const Array3 = [
  { text: "Répartition des rôles", icon: <BarChartOutlined />, path: "/bar" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlined />, path: "/DashLine" },
  { text: "Line Chart", icon: <TimelineOutlined />, path: "/lines" },
];

const ArrayManager1 = [
  { text: "Dashboard", icon: <HomeOutlined />, path: "/Dashboards" },
  { text: "Gere des tâches", icon: <PeopleOutlined />, path: "/TabManager" },
  { text: "Créer des tâches", icon: <ReceiptOutlined />, path: "/manager" },
];

const ArrayManager2 = [
  {
    text: "Suivi des tâches",
    icon: <PersonOutlined />,
    path: "/TachesTraitees",
  },
  {
    text: "Calendrier",
    icon: <CalendarTodayOutlined />,
    path: "/PlannerMeeting",
  },
];

const ArrayManager3 = [
  { text: "Bar Chart", icon: <BarChartOutlined />, path: "/Dash" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlined />, path: "/DashLine" },
  { text: "Line Chart", icon: <TimelineOutlined />, path: "/lines" },
];

const ArrayUser1 = [
  { text: "Dashboard", icon: <HomeOutlined />, path: "/Dashboards" },
  { text: "Liste des tâches", icon: <PeopleOutlined />, path: "/user" },
  { text: "Kanban", icon: <ReceiptOutlined />, path: "/Task" },
];

const ArrayUser2 = [
  // { text: "Créer un Profil", icon: <PersonOutlined />, path: "/PageAjoutUtilisateur" },
  // { text: "Calendrier", icon: <CalendarTodayOutlined />, path: "/PlannerMeeting" },
  {
    text: "Liste des réuinion",
    icon: <CalendarMonthIcon />,
    path: "/PrintMeeting",
  },
];

const ArrayUser3 = [
  { text: "Bar Chart", icon: <BarChartOutlined />, path: "/Dash" },
  { text: "Pie Chart", icon: <PieChartOutlineOutlined />, path: "/DashLine" },
  { text: "Line Chart", icon: <TimelineOutlined />, path: "/lines" },
];
const user = JSON.parse(localStorage.getItem("user"));
console.log("User info:", user);

// COMPOSANT SIDEBAR
const SideBar = ({ open, handleDrawerClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";
  const name = user?.name || "Utilisateur";
  const avatarUrl = user?.avatar || "image.png";

  let sidebarSections = [];

  if (role === "manager") {
    sidebarSections = [
      { items: ArrayManager1 },
      { items: ArrayManager2 },
      { items: ArrayManager3 },
    ];
  } else if (role === "user") {
    sidebarSections = [
      { items: ArrayUser1 },
      { items: ArrayUser2 },
      { items: ArrayUser3 },
    ];
  } else {
    role === "admin";
    sidebarSections = [{ items: Array1 }, { items: Array2 }, { items: Array3 }];
  }

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>

      <Divider />
      <Avatar
        sx={{
          mx: "auto",
          width: open ? 88 : 44,
          height: open ? 88 : 44,
          my: 1,
          border: "2px solid grey",
          transition: "0.25s",
        }}
        alt={name}
        src={avatarUrl}
      />
      <Typography
        align="center"
        sx={{ fontSize: open ? 17 : 0, transition: "0.25s" }}
      >
        {name}
      </Typography>
      <Typography
        align="center"
        sx={{
          fontSize: open ? 15 : 0,
          transition: "0.25s",
          color: theme.palette.info.main,
        }}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Typography>

      {sidebarSections.map((section, i) => (
        <React.Fragment key={i}>
          <Divider />
          <List>
            {section.items.map((item) => (
              <ListItem
                key={item.path}
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title={open ? null : item.text} placement="left">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      bgcolor:
                        location.pathname === item.path
                          ? theme.palette.mode === "dark"
                            ? grey[800]
                            : grey[300]
                          : null,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      ))}
    </Drawer>
  );
};

export default SideBar;
