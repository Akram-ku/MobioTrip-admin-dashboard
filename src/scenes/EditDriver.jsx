import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../components/Header";
import { tokens } from "../Theme.js";
import * as yup from "yup";
import Loading from "./Loading";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  birth_date: yup.date().required("Birth date is required"),
  username: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  seats_number: yup
    .number()
    .required("Seats Number is required")
    .min(1, "Seats Number must be at least 1"),
});

const EditDriver = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(
          `https://4407-31-9-106-65.ngrok-free.app/users/drivers/${id}`,
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
          throw new Error("Failed to fetch driver");
        }

        const data = await response.json();
        console.log(data);
        setDriver(data);
        // reset(data); // Set the form values
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };

    fetchDriver();
  }, [id]);

  const onSubmit = async (formData) => {
    formData.birth_date = new Date(formData.birth_date)
      .toISOString()
      .split("T")[0];
    console.log(formData);

    const mergedData = {
      ...driver, // Include all original data
      ...formData, // Override with updated form data
    };
    delete mergedData.phone_number;
    console.log("merged", mergedData);
    try {
      await fetch(
        `https://4407-31-9-106-65.ngrok-free.app/users/drivers/${id}/`,
        {
          method: "PUT",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify(mergedData),
        }
      );
      navigate("/drivers");
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  if (!driver) {
    return (
      <Box sx={{ height: "600px" }}>
        <Loading />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="Edit Driver" subtitle="Edit Driver Details" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...register("first_name")}
          defaultValue={driver.first_name}
          error={!!errors.first_name}
          helperText={errors.first_name ? errors.first_name.message : ""}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...register("last_name")}
          defaultValue={driver.last_name}
          error={!!errors.last_name}
          helperText={errors.last_name ? errors.last_name.message : ""}
        />
        <TextField
          label="Birth Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("birth_date")}
          defaultValue={driver.birth_date}
          error={!!errors.birth_date}
          helperText={errors.birth_date ? errors.birth_date.message : ""}
        />
        <TextField
          label="Gender"
          fullWidth
          margin="normal"
          {...register("gender")}
          defaultValue={driver.gender}
          error={!!errors.gender}
          helperText={errors.gender ? errors.gender.message : ""}
        />
        <TextField
          label="username"
          fullWidth
          margin="normal"
          {...register("username")}
          defaultValue={driver.phone_number}
          error={!!errors.phone_number}
          helperText={errors.phone_number ? errors.phone_number.message : ""}
        />
        <Select
          fullWidth
          defaultValue=""
          {...register("seats_number")}
          error={!!errors.gender}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: errors.gender
                ? theme.palette.error.main
                : colors.grey[200],
            },
            "& label.Mui-focused": {
              color: colors.grey[100],
            },
          }}
        >
          <MenuItem value="driver.seats_number" disabled>
            Select Seats
          </MenuItem>
          <MenuItem value="2">Small</MenuItem>
          <MenuItem value="5">Medium</MenuItem>
          <MenuItem value="8">Large</MenuItem>
        </Select>
        {errors.seats_number && (
          <FormHelperText error>{errors.seats_number.message}</FormHelperText>
        )}
        <Button
          type="submit"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginTop: "10px",
          }}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditDriver;
