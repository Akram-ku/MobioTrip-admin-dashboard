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
import { tokens } from "../Theme.js";
import { Link } from "react-router-dom";
import DockIcon from "@mui/icons-material/Dock";

const Stations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/stations/",
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
        const transformedData = data.results.map((user, index) => ({
          id: index,
          station_latitude: user.station_latitude,
          station_location: user.station_location,
          station_longitude: user.station_longitude,
          station_name: user.station_name,
          stations_vehicles: user.stations_vehicles,
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
    { field: "station_latitude", headerName: "Station Latitude ", flex: 1 },
    { field: "station_location", headerName: "Station Location", flex: 1 },
    { field: "station_longitude", headerName: "Station Longitude", flex: 1 },
    { field: "station_name", headerName: "Station Name", flex: 1 },
    { field: "stations_vehicles", headerName: "Staion Vehicles", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Stations" subtitle="Managing the Stations" />
        <Link to="/add-station">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DockIcon sx={{ mr: "10px" }} />
            Add Station
          </Button>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height={"65vh"}
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

export default Stations;
