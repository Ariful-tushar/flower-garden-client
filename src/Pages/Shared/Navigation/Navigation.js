import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "./../../../Hooks/useAuth";
import { useHistory } from "react-router";

const Navigation = () => {
  const { user, logOut } = useAuth();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };
  const handleDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {user?.email ? (
              <div>
                <Button onClick={handleDashboard} color="inherit">
                  DashBoard
                </Button>
                <Button onClick={logOut} color="inherit">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin} color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navigation;
