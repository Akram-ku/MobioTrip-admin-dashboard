import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery, Button } from "@mui/material";
import { tokens } from "../Theme.js";
import Header from "../components/Header.jsx";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link } from "react-router-dom";
import UserDataGrid from "./userDataGrid.jsx";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://192.168.43.115:8000/api/users");
  //       const data = await response.json();
  //       setRows(data);
  //       console.log(rows);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Users" subtitle="Managing the Users" />
        <Link to="/add-user">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <PersonAddAltIcon sx={{ mr: "10px" }} />
            Add User
          </Button>
        </Link>
      </Box>

      <UserDataGrid />
    </Box>
  );
};

export default Users;
