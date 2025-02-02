import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery, Button } from "@mui/material";
import { tokens } from "../Theme.js";
import { baseUrl } from "./shared.js";
import Header from "../components/Header.jsx";
import EmployeeDataGrid from "./EmployeeDataGrid.jsx";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "react-router-dom";

const Publisher = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/employees/publishers/",
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
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: user.birth_date,
          gender: user.gender,
          username: user.username,
          // birth_date: user.birth_date,
          // username: user.username,
        }));

        setRows(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Publishers" subtitle="Managing the Publishers" />
        <Link to="/add-publisher">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <ManageAccountsIcon sx={{ mr: "10px" }} />
            Add Publisher
          </Button>
        </Link>
      </Box>

      <EmployeeDataGrid rows={rows} setRows={setRows} />
    </Box>
  );
};

export default Publisher;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://192.168.43.115:8000/api/users");
//         const data = await response.json();
//         setRows(data);
//         console.log(rows);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);
