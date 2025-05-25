// components/Nav.jsx
import { AppBar, Toolbar, Typography } from "@mui/material";

const Nav = ({ title = "Kanban Board" }) => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
