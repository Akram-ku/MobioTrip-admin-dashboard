import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Person4Icon from "@mui/icons-material/Person4";
import { tokens } from "../Theme.js";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Vehicles = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/vehicles/public/",
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
        // Transform data to fit the DataGrid columns
        const transformedData = data.results.map((user) => ({
          id: user.owner_id,
          seats_number: user.seats_number,
          vehicle_color: user.vehicle_color,
          vehicle_governorate: user.vehicle_governorate,
          vehicle_number: user.vehicle_number,
          vehicle_type: user.vehicle_type === 0 ? "Public" : "Personal",
        }));

        setRows(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(`Number of rows: ${rows.length}`);
  }, [rows]);

  const columns = [
    { field: "id", headerName: "Vehicle ID", flex: 1 },
    { field: "seats_number", headerName: "Seats_Number", flex: 1 },
    { field: "vehicle_color", headerName: "Vehicle_Color", flex: 1 },
    {
      field: "vehicle_governorate",
      headerName: "Vehicle_Governorate",
      flex: 1,
    },
    { field: "vehicle_number", headerName: "Vehicle_Number", flex: 1 },
    { field: "vehicle_type", headerName: "Vehicle_Type", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box>
            <Tooltip title="Owner info">
              <IconButton onClick={() => navigate(`/owner/${id}`)}>
                <Person4Icon />
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
        <Header title="Vechicles" subtitle="Managing the Vehicles" />
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

export default Vehicles;
