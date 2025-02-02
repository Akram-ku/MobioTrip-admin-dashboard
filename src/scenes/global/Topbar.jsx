import React, { useState, createContext, useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  InputBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import TimelineIcon from "@mui/icons-material/Timeline";
import FeedIcon from "@mui/icons-material/Feed";
import { tokens } from "../../theme";
import { ColorModeContext } from "../../Theme";

export const SidebarContext = createContext();

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logoSrc =
    theme.palette.mode === "dark"
      ? "../../../public/Logo_mobile_app(withoutBackground )_white.svg"
      : "../../../public/Logo_mobile_app(withoutBackground )_black.svg";

  return (
    <SidebarContext.Provider value={{ handleToggleCollapse }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center">
          {/* IconButton to Toggle Sidebar */}
          <IconButton
            onClick={handleToggleCollapse}
            sx={{
              color: colors.grey[100],
              marginRight: 2,
            }}
          >
            <MenuOutlinedIcon sx={{ fontSize: "2rem" }} />
          </IconButton>

          {/* LOGO */}
          <Box
            sx={{
              maxWidth: { xs: "150px", sm: "150px", md: "200px" },
              height: "auto",
              marginRight: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logoSrc}
              alt="Logo"
              style={{ width: "30%", height: "auto" }}
            />
          </Box>
          {/*<Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            alignItems="center"
            marginRight={2}
          ></Box> */}
        </Box>

        {/* Right Section */}
        <Box display="flex">
          {/* Settings and Color Mode Toggle */}
          <Box display="flex" alignItems="center" marginRight={2}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton component={Link} to="/settings">
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Sidebar */}
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
          {/* Sidebar Content */}
          <List>
            {/* Sidebar items */}
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
            <Divider />
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            {/* <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>*/}
            <ListItem button component={Link} to="/publishers">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Publishers" />
            </ListItem>
            <ListItem button component={Link} to="/riders">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Riders" />
            </ListItem>
            <ListItem button component={Link} to="/drivers">
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Drivers" />
            </ListItem>
            <ListItem button component={Link} to="/trips">
              <ListItemIcon>
                <AirlineStopsIcon />
              </ListItemIcon>
              <ListItemText primary="Manage trips" />
            </ListItem>
            <ListItem button component={Link} to="/stations">
              <ListItemIcon>
                <AirlineStopsIcon />
              </ListItemIcon>
              <ListItemText primary="Manage stations" />
            </ListItem>
            <ListItem button component={Link} to="/vehicles">
              <ListItemIcon>
                <LocalTaxiOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage vehicles" />
            </ListItem>
            <ListItem button component={Link} to="/news">
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="News Page" />
            </ListItem>
            <ListItem button component={Link} to="/graph">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Graph" />
            </ListItem>
            <Divider />
          </List>
        </SwipeableDrawer>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Topbar;
