import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme, Box, Card, Typography } from "@mui/material";
import { tokens } from "../Theme.js";
import {
  TextField,
  Button,
  Grid,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  station_name: yup.string().required("Station Name is required"),
  station_location: yup.string().required("Station Location is required"),
  station_longitude: yup.number().required("Station Longitude is required"),
  station_latitude: yup.number().required("Station Latitude is required"),
  vehicles: yup.array().of(yup.string()),
});

const AddStation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [rows, setRows] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/vehicles/public",
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
        const transformedData = data.results.map((user) => ({
          owner_id: user.owner_id,
          vehicle_number: user.vehicle_number,
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/stations/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify({
            station_name: formData.station_name,
            station_location: formData.station_location,
            station_longitude: formData.station_longitude,
            station_latitude: formData.station_latitude,
            stations_vehicles: selectedVehicles,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add station");
      }

      const responseData = await response.json();
      console.log("Station added successfully:", responseData);
    } catch (error) {
      console.error("Error adding station:", error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const intValue = parseInt(value);

    setSelectedVehicles((prevSelected) => {
      if (prevSelected.includes(intValue)) {
        return prevSelected.filter((vehicle) => vehicle !== intValue);
      } else {
        return [...prevSelected, intValue];
      }
    });
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <h1>Add Station</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Station Name"
                variant="outlined"
                {...register("station_name")}
                error={!!errors.station_name}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.station_name
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.station_name && (
                <FormHelperText error>
                  {errors.station_name.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Station Location"
                variant="outlined"
                {...register("station_location")}
                error={!!errors.station_location}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.station_location
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.station_location && (
                <FormHelperText error>
                  {errors.station_location.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Station Longitude"
                variant="outlined"
                {...register("station_longitude")}
                error={!!errors.station_longitude}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.station_longitude
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.station_longitude && (
                <FormHelperText error>
                  {errors.station_longitude.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Station Latitude"
                variant="outlined"
                {...register("station_latitude")}
                error={!!errors.station_latitude}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.station_latitude
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.station_latitude && (
                <FormHelperText error>
                  {errors.station_latitude.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: 2,
                  backgroundColor: colors.primary[400],
                  borderRadius: "8px",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: colors.grey[100] }}
                >
                  Select Vehicles
                </Typography>
                <Grid container spacing={1}>
                  {rows.map((vehicle) => (
                    <Grid item xs={12} sm={6} key={vehicle.owner_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            onChange={handleCheckboxChange}
                            value={vehicle.owner_id}
                            checked={selectedVehicles.includes(
                              vehicle.owner_id
                            )}
                          />
                        }
                        label={vehicle.vehicle_number}
                        sx={{
                          color: colors.grey[100],
                          "& .MuiCheckbox-root": {
                            color: colors.grey[100],
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                {errors.vehicles && (
                  <FormHelperText error>
                    {errors.vehicles.message}
                  </FormHelperText>
                )}
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: colors.blueAccent[600],
                  color: colors.grey[100],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[700],
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddStation;
