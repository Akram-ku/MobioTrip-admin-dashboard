import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import { tokens } from "../theme";

// Import MUI components
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Container,
  useTheme,
} from "@mui/material";

// Define the schema for validation using Yup
const schema = yup.object().shape({
  src_node_id: yup
    .number()
    .required("Source node is required")
    .integer()
    .positive(),
  dst_node_id: yup
    .number()
    .required("Destination node is required")
    .integer()
    .positive(),
});

function Graph({ graphData }) {
  const networkRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const colorMap = {
    skyway: "cyan",
    "overland route": "brown",
    "sea route": "blue",
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/model/predict/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const { predicted_path } = result;

      // Ensure predicted_path is an array with at least 2 nodes
      if (Array.isArray(predicted_path) && predicted_path.length > 1) {
        const pathEdges = [];
        for (let i = 0; i < predicted_path.length - 1; i++) {
          pathEdges.push(`${predicted_path[i]}-${predicted_path[i + 1]}`);
        }

        // Check if networkRef.current is defined
        if (networkRef.current) {
          const edgesToUpdate = [];
          pathEdges.forEach((edgeId) => {
            if (networkRef.current.body.edges[edgeId]) {
              console.log(`Updating edge: ${edgeId}`); // Debugging log
              edgesToUpdate.push({
                id: edgeId,
                color: { color: "green" },
                width: 4, // Increase the width of the updated edges
                arrows: { to: { scaleFactor: 2 } }, // Make the arrow bigger
              });
            } else {
              console.warn(`Edge not found: ${edgeId}`); // Debugging log
            }
          });

          if (edgesToUpdate.length > 0) {
            networkRef.current.body.data.edges.update(edgesToUpdate);
            console.log("Edges updated: ", edgesToUpdate); // Debugging log

            // Force network redraw
            networkRef.current.redraw();
          } else {
            console.warn("No edges to update");
          }
        } else {
          console.error("Network instance is not available");
        }
      } else {
        console.warn("Predicted path is not valid or empty");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const container = document.getElementById("mynetwork");
    const data = {
      nodes: graphData.nodes,
      edges: graphData.edges.map((edge) => {
        const { label, ...rest } = edge;
        return {
          ...rest,
          color: { color: colorMap[label] || "white" },
          arrows: "to",
        };
      }),
    };
    console.log(data);
    const options = {
      nodes: {
        shape: "circle",
        size: 35,
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow",
          },
        },
      },
    };

    const network = new Network(container, data, options);

    // Store the network instance in the ref
    networkRef.current = network;

    // Clean up when the component unmounts
    return () => {
      network.destroy();
    };
  }, [graphData]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden", // Prevents any scrollbars
      }}
    >
      <Box id="mynetwork" />
      <Box
        sx={{
          position: "absolute",
          top: "20px", // Adjusted top margin for better alignment
          left: "20px",
          backgroundColor: colors.primary[400],
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          maxWidth: "300px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Predict Path
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Source Node"
                type="number"
                fullWidth
                variant="outlined"
                {...register("src_node_id")}
                error={!!errors.src_node_id}
                helperText={errors.src_node_id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination Node"
                type="number"
                fullWidth
                variant="outlined"
                {...register("dst_node_id")}
                error={!!errors.dst_node_id}
                helperText={errors.dst_node_id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[100],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                  },
                }}
                fullWidth
              >
                Predict
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Graph;
