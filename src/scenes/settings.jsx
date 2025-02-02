import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Paper,
  Avatar,
} from "@mui/material";
import { tokens } from "../Theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/users/profile/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://4407-31-9-106-65.ngrok-free.app",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error state, show user feedback if needed
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 160px)", // Adjust height based on header and margins
          backgroundColor: colors.background,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            textAlign: "center",
            backgroundColor: colors.blueAccent[800],
            borderRadius: 2,
          }}
        >
          <Avatar
            src="../../public/profile.png" // Update with actual user data
            sx={{
              width: 100,
              height: 100,
              mb: 3,
              mx: "auto",
            }}
          >
            {user ? user.first_name.charAt(0) : ""}{" "}
            {/* Display initial if picture not available */}
          </Avatar>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Profile Information
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            First Name: {user ? user.first_name : ""}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Last Name: {user ? user.last_name : ""}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Gender: {user ? user.gender : ""}
          </Typography>
          {/*<Typography variant="h6" sx={{ mb: 2 }}>
            Phone Number: {user ? user.phone_number : ""}
          </Typography>*/}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Birth Date: {user ? user.birth_date : ""}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
