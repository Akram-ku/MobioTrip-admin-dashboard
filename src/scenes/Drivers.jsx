import React, { useState, useEffect } from "react";
import { baseUrl } from "./shared.js";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Theme.js";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Drivers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/users/drivers/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://4407-31-9-106-65.ngrok-free.app",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        const transformedData = data.results.map((user) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: user.birth_date,
          username: user.username,
          gender: user.gender,
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://4407-31-9-106-65.ngrok-free.app/users/drivers/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
        }
      );

      if (response.ok) {
        setRows((prev) => prev.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete driver");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };
  // const mockDataTeam = [
  //   {
  //     id: 1,
  //     name: "V001",
  //     owner_id: "O001",
  //     Phone_number: "12345",
  //     gender: "Male",
  //   },
  //   {
  //     id: 2,
  //     name: "V002",
  //     owner_id: "O002",
  //     Phone_number: "67890",
  //     gender: "Female",
  //   },
  // ];

  // const [rows, setRows] = useState(mockDataTeam);

  // useEffect(() => {
  //   console.log(`Number of rows: ${rows.length}`);
  // }, [rows]);

  const columns = [
    { field: "id", headerName: "User ID", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "username", headerName: "Phone Number", flex: 1 },
    { field: "birth_date", headerName: "Birth Date", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(id)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={() => navigate(`/edit-driver/${id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Drivers" subtitle="Managing the Drivers" />
        <Link to="/add-driver">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <PersonAddIcon sx={{ mr: "10px" }} />
            Add Driver
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height={isMobile ? "75vh" : "65vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={false} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Drivers;
