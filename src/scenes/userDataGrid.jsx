import { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Theme.js";
import { mockDataTeam } from "../data/mockData.js";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Header from "../components/Header.jsx";

const Userdatagrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen
  const [rows, setRows] = useState(mockDataTeam);
  let filteredColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: isMobile ? 1 : 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: isMobile ? 1 : 2,
    },
  ];

  if (!isMobile) {
    filteredColumns = [
      ...filteredColumns,
      {
        field: "id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "Action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => {
          const { id } = params.row;
          return (
            <Box>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    setRows((prev) => {
                      return prev.filter((el) => el.id !== id);
                    });
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ];
  }

  return (
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
        columns={filteredColumns}
      />
    </Box>
  );
};

export default Userdatagrid;
