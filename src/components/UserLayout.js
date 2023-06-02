import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserAuthStore from "../zustand/UserAuthStore";
import { useEffect } from "react";
import UserGuard from "../authGuard/UserGuard";

const UserLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const getMe = UserAuthStore((state) => state.getMe);
  const me = UserAuthStore((state) => state.me);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMe();
      } catch (error) {
        console.log(`${error.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={setDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* User Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              {me?.name}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ backgroundColor: "rgba(228, 233, 190, 1)" }}>
                  <AccountCircleIcon color="primary" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                to="/logout"
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* User Icon */}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "50px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default UserGuard(UserLayout);
