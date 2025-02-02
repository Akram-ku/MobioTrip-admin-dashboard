import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import Bar from "./Bar";
import Pie from "./Pie";
import Line from "./Line";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const fetchData = async () => {
    try {
      const barResponse = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/trips/statistics/trips/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
        }
      );
      const lineResponse = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/trips/statistics/trips/time/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
        }
      );
      const pieResponse = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/users/statistics/users/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
        }
      );

      if (!barResponse.ok || !pieResponse.ok || !lineResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const barData = await barResponse.json();
      const pieData = await pieResponse.json();
      const lineData = await lineResponse.json();
      console.log(barData);
      console.log(lineData);
      console.log(pieData);
      setBarData(barData.data);
      setPieData(pieData.data);
      setLineData(lineData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const boxShadowStyle = {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box height="75vh">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows={isSmallScreen ? "auto" : "110px"}
          gap="20px"
        >
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow={isSmallScreen ? "span 1" : "span 2"}
            backgroundColor={colors.primary[400]}
            sx={boxShadowStyle}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Add any header or controls here */}
            </Box>
            <Box height={isSmallScreen ? "250px" : "200px"} m="-20px 0 0 0">
              <Line data={lineData} />
            </Box>
          </Box>
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 6"}
            gridRow={isSmallScreen ? "span 1" : "span 2"}
            backgroundColor={colors.primary[400]}
            sx={boxShadowStyle}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Add any header or controls here */}
            </Box>
            <Box height={"250px"} m="-20px 0 0 0">
              <Pie data={pieData} />
            </Box>
          </Box>
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 6"}
            gridRow={isSmallScreen ? "span 1" : "span 2"}
            backgroundColor={colors.primary[400]}
            sx={boxShadowStyle}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Add any header or controls here */}
            </Box>
            <Box height={"250px"} m="-20px 0 0 0">
              <Bar data={barData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
