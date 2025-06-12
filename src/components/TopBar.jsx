

import {
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { alpha } from "@mui/material/styles";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import NotificationBox from "./Notifications";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        <Box flexGrow={1} />

        <Stack direction={"row"}>
          <IconButton
            onClick={() => setIsNotifVisible(!isNotifVisible)}
            color="inherit"
          >
            <div>
              <NotificationsOutlinedIcon />
              <div
                style={{
                  backgroundColor: "red",
                  position: "absolute",
                  height: 10,
                  width: 10,
                  borderRadius: 100,
                  top: 13,
                }}
              />
            </div>
          </IconButton>
          {isNotifVisible && <NotificationBox />}

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}>
              <Person2OutlinedIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
