import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Theme.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";

const Riders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen
  const [rows, setRows] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://4407-31-9-106-65.ngrok-free.app/users/riders/"
  ); // Start with the initial URL
  const [Size, setSize] = useState(50); // Number of rows per page
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(0); // Current page
  const navigate = useNavigate();

  // Define fetchData function
  const fetchData = async (url) => {
    setLoading(true);
    console.log(url);
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          "ngrok-skip-browser-warning": "true",
          Origin: "https://4407-31-9-106-65.ngrok-free.app",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Debugging log

      const transformedData = data.results.map((user) => ({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        birth_date: user.birth_date,
        username: user.username,
      }));

      setRows(transformedData); // Replace rows with new data
      setNextUrl(data.next); // Update the next URL for pagination
      setSize(data.count); // Update the total count of rows
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(nextUrl);
  }, []); // Fetch data whenever the page changes

  const handlePageChange = (paginationModel) => {
    const { page } = paginationModel;
    console.log("Page change triggered", page); // Debugging log

    // Only fetch if there's a `nextUrl` and it's not already loading
    if (nextUrl && !loading) {
      console.log("Fetching next page data"); // Log before fetching

      // Use pagination model to calculate the correct offset
      fetchData(nextUrl);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://4407-31-9-106-65.ngrok-free.app/users/riders/${id}/`,
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
        console.error("Failed to delete rider");
      }
    } catch (error) {
      console.error("Error deleting rider:", error);
    }
  };

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
              <IconButton onClick={() => navigate(`/edit-rider/${id}`)}>
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
      <Header title="Riders" subtitle="Managing Riders" />
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
        <DataGrid
          checkboxSelection={false}
          rows={rows}
          columns={columns}
          pageSize={pageSize} // Set initial page size to 50
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Update pageSize state
          pageSizeOptions={[50, 100]} // Restrict options to 50 rows per page
          pagination
          paginationMode="server" // Enable server-side pagination
          rowCount={Size} // Total number of rows from the server
          loading={loading} // Show loading indicator when fetching data
          onPaginationModelChange={(params) => handlePageChange(params)} // Handle page changes
        />
      </Box>
    </Box>
  );
};

export default Riders;
