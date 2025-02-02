import React, { useState, createContext, useContext } from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import { tokens } from "../../theme";

export const SidebarContext = createContext();
const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ handleToggleCollapse }}>
      <Box sx={{ display: "flex" }}>
        {/* Icon Button to Toggle Drawer */}
        <Box sx={{ justifyContent: "flex-start", width: "100%" }}>
          <IconButton
            onClick={handleToggleCollapse}
            sx={{
              color: colors.grey[100],
              margin: "10px 0 20px 0",
              textAlign: "center",
            }}
          >
            <MenuOutlinedIcon
              sx={{ fontSize: isCollapsed ? "inherit" : "2rem" }}
            />
          </IconButton>
        </Box>

        <SwipeableDrawer
          anchor="left"
          open={!isCollapsed}
          onClose={handleToggleCollapse}
          onOpen={handleToggleCollapse}
          sx={{
            "& .MuiDrawer-paper": {
              width: isCollapsed ? 64 : 192,
              transition: "width 0.4s ease",
              backgroundColor: colors.primary[400],
              overflowX: "hidden",
            },
          }}
        >
          {/* Drawer Content */}
          <List>
            {!isCollapsed && (
              <>
                <Divider />
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 96, height: 96, marginBottom: 1 }}
                    alt="Profile Picture"
                    src="/public/profile.png"
                  />
                  <Typography variant="h6" color={colors.blueAccent[400]}>
                    Admin
                  </Typography>
                  <Typography variant="h6" color={colors.grey[100]}>
                    User Name
                  </Typography>
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Team" />
            </ListItem>
            <ListItem button component={Link} to="/trips">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage trips" />
            </ListItem>
            <ListItem button component={Link} to="/vehicles">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage vehicles" />
            </ListItem>
            <ListItem button component={Link} to="/faq">
              <ListItemIcon>
                <HelpOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="News Page" />
            </ListItem>
            <Divider />
          </List>
        </SwipeableDrawer>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
