import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Theme.js";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const Trips = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/trips/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
              Origin: "https://4407-31-9-106-65.ngrok-free.app",
            },
          }
        );

        const contentType = response.headers.get("content-type");
        console.log("Response Headers:", response.headers);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `Failed to fetch trips: ${response.status} ${response.statusText}\n${text}`
          );
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data);
          // console.log("Data:", data);

          const transformedData = data.results.map((trip) => ({
            id: trip.id,
            start_xcoord: trip.start_xcoord,
            start_ycoord: trip.start_ycoord,
            end_xcoord: trip.end_xcoord,
            end_ycoord: trip.end_ycoord,
            start_time: trip.start_time,
            end_time: trip.end_time,
            // rider_username: trip.rider.username,
            // driver_username: trip.driver.username,
            status:
              trip.status === 0
                ? "DONE"
                : trip.status === 1
                ? "DELAYED"
                : trip.status === 2
                ? "Reported"
                : "UNKNOWN",
            rate:
              trip.rate === 0
                ? "BAD"
                : trip.rate === 1
                ? "NORM"
                : trip.rate === 2
                ? "GOOD"
                : "UNKNOWN",
          }));

          setRows(transformedData);
        } else {
          const text = await response.text();
          throw new Error(`Received non-JSON response\n${text}`);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const columns = [
    { field: "id", headerName: "Trip ID", flex: 1 },
    { field: "start_xcoord", headerName: "Start X Coordinate", flex: 1 },
    { field: "start_ycoord", headerName: "Start Y Coordinate", flex: 1 },
    { field: "end_xcoord", headerName: "End X Coordinate", flex: 1 },
    { field: "end_ycoord", headerName: "End Y Coordinate", flex: 1 },
    { field: "start_time", headerName: "Start Time", flex: 2 },
    { field: "end_time", headerName: "End Time", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "rate", headerName: "Rate", flex: 1 },
    // { field: "rider_username", headerName: "Rider Username", flex: 1 },
    // { field: "driver_username", headerName: "Driver Username", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Trips" subtitle="Managing the Trips for Members" />
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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <DataGrid checkboxSelection={false} rows={rows} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Trips;
