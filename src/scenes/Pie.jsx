import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Loading from "./Loading";

const Pie = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log("Pie Data:", data); // Log the data for debugging

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <ResponsivePie
      data={data}
      theme={{
        tooltip: {
          container: {
            color: "#000",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        },
        legends: {
          text: {
            fill: colors.grey[100], // Color for legend text
          },
        },
        labels: {
          text: {
            fill: colors.grey[100], // Color for slice labels
          },
        },
      }}
      margin={{ top: 20, right: 80, bottom: 40, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor={colors.grey[100]} // Color for radial labels
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor={colors.grey[100]} // Color for slice labels
    />
  );
};

export default Pie;
