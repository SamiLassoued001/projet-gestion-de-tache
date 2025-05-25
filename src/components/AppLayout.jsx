import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

// Partie principale (décalée selon l'état du Sidebar)
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AppLayout = ({ children, setMode }) => {
  const [open, setOpen] = useState(true);

  return (
    <Box  >
      <CssBaseline />
      <TopBar open={open} handleDrawerOpen={() => setOpen(true)} setMode={setMode} />
      <SideBar open={open} handleDrawerClose={() => setOpen(false)} />
      <Main open={open}>
        <DrawerHeader /> {/* pousse le contenu sous la TopBar */}
        {children}
      </Main>
    </Box>
  );
};

export default AppLayout;
