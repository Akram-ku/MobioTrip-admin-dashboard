import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import TagAccordion from "./TagAccordion";
import { useState, useEffect } from "react";
import { tokens } from "../Theme.js";
import Loading from "./Loading.jsx";

const News = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accordionData, setAccordionData] = useState(null); // Initialize with an object that contains results as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/news/posts/",
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
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);

        setAccordionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://4407-31-9-106-65.ngrok-free.app/news/posts/${id}/`,
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

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      // Optionally update state or refresh data after successful delete
      // For example:
      // const updatedAccordionData = accordionData.filter(item => item.id !== id);
      // setAccordionData(updatedAccordionData);

      console.log("Deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  if (accordionData === null) {
    return (
      <Box
        sx={{
          height: "90vh", // Full viewport height
          width: "100vw", // Full viewport width
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="News" subtitle="See our latest news" />
      </Box>
      {accordionData.results.map((accordion) => (
        <TagAccordion
          key={accordion.id}
          title={accordion.title}
          tags={accordion.tags}
          content={accordion.content}
          onDelete={() => handleDelete(accordion.id)}
        />
      ))}
    </Box>
  );
};

export default News;
