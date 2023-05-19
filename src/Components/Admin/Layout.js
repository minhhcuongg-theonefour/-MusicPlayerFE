import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiMusic } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

const drawerWidth = 240;

export default function Layout() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNaviGenresDashboard = () => {
    navigate("/admin/manage-genres");
  };

  const hanldeNaviSongDashboard = () => {
    navigate("/admin/manage-song");
  };

  const hanldeNaviDashboard = () => {
    navigate("/admin/dashboard");
  };
  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "#282828" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "#282828",
          }}
        >
          <Stack direction="row">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                B2CD MUSIC MANAGEMENT
              </Typography>
            </Toolbar>
            <Tooltip title="Log out">
              <LogoutIcon
                onClick={() => dispatch(logout())}
                sx={{ color: "#fff", mt: "20px", marginLeft: 115 }}
              />
            </Tooltip>
          </Stack>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#282828",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <div className="logoContainer">
              <div className="logo">
                <i>
                  <FiMusic />
                </i>

                <h2>B2CD</h2>
              </div>
            </div>
          </Toolbar>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ color: "#fff" }}>
              <ListItemButton onClick={hanldeNaviDashboard}>
                <ListItemIcon>
                  <div className="logoContainer">
                    <div className="logo">
                      <i>
                        <AiOutlineUser />
                      </i>
                      <Typography variant="h6" sx={{ marginLeft: 2 }}>
                        View user
                      </Typography>
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: "#fff" }}>
              <ListItemButton onClick={hanldeNaviSongDashboard}>
                <ListItemIcon>
                  <div className="logoContainer">
                    <div className="logo">
                      <i>
                        <FiMusic />
                      </i>

                      <Typography variant="h6" sx={{ marginLeft: 2 }}>
                        Manage song
                      </Typography>
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ color: "#fff" }}>
              <ListItemButton onClick={handleNaviGenresDashboard}>
                <ListItemIcon>
                  <div className="logoContainer">
                    <div className="logo">
                      <i>
                        <BiLibrary />
                      </i>

                      <Typography variant="h6" sx={{ marginLeft: 2 }}>
                        Manage genres
                      </Typography>
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: "1300px",
            backgroundColor: "#ecf0f1",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
