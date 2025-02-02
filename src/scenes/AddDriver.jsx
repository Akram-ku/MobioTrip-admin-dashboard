import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material";
import { tokens } from "../Theme.js";
import { baseUrl } from "./shared.js";
import {
  TextField,
  Button,
  Grid,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  gender: yup.string().required("Gender is required"),
  birth_date: yup.date().required("Birth Date is required"),
  username: yup.string().required("Phone Number is required"),
  vehicle_number: yup
    .string()
    .required("Vehicle Number is required")
    .min(7, "must be seven numbers"),
  seats_number: yup
    .number()
    .required("Seats Number is required")
    .min(1, "Seats Number must be at least 1"),
  vehicle_color: yup.string().required("Vehicle Color is required"),
  vehicle_governorate: yup.string().required("Vehicle Governorate is required"),
});

const AddDriver = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "",
      vehicle_governorate: "",
    },
  });

  const onSubmit = async (data) => {
    // Convert birth_date to string format YYYY-MM-DD
    data.birth_date = new Date(data.birth_date).toISOString().split("T")[0];

    // Structure data according to required format
    const structuredData = {
      owner: {
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        gender: data.gender,
        birth_date: data.birth_date,
        username: data.username,
      },
      vehicle: {
        vehicle_number: data.vehicle_number,
        seats_number: data.seats_number,
        vehicle_color: data.vehicle_color,
        vehicle_governorate: data.vehicle_governorate,
      },
    };

    console.log("Submitting data:", structuredData);

    try {
      const response = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/vehicles/public/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify(structuredData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Assuming server returns JSON error message
        throw new Error(
          `Server error: ${response.status} - ${errorData.message}`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <h1>Add Driver</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First name"
                variant="outlined"
                {...register("first_name")}
                error={!!errors.first_name}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.first_name
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.first_name && (
                <FormHelperText error>
                  {errors.first_name.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                {...register("last_name")}
                error={!!errors.last_name}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.last_name
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.last_name && (
                <FormHelperText error>
                  {errors.last_name.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="password"
                fullWidth
                label="Password"
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.password
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                defaultValue=""
                {...register("gender")}
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
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText error>{errors.gender.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="Birth Date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...register("birth_date")}
                error={!!errors.birth_date}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.birth_date
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.birth_date && (
                <FormHelperText error>
                  {errors.birth_date.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                {...register("username")}
                error={!!errors.username}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.username
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vehicle Number"
                variant="outlined"
                {...register("vehicle_number")}
                error={!!errors.vehicle_number}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.vehicle_number
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.vehicle_number && (
                <FormHelperText error>
                  {errors.vehicle_number.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Seats Number"
                variant="outlined"
                {...register("seats_number")}
                error={!!errors.seats_number}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.seats_number
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.seats_number && (
                <FormHelperText error>
                  {errors.seats_number.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vehicle Color"
                variant="outlined"
                {...register("vehicle_color")}
                error={!!errors.vehicle_color}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.vehicle_color
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              />
              {errors.vehicle_color && (
                <FormHelperText error>
                  {errors.vehicle_color.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                defaultValue=""
                {...register("vehicle_governorate")}
                error={!!errors.vehicle_governorate}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.vehicle_governorate
                      ? theme.palette.error.main
                      : colors.grey[200],
                  },
                  "& label.Mui-focused": {
                    color: colors.grey[100],
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Governorate
                </MenuItem>
                <MenuItem value="Homs">Homs</MenuItem>
                <MenuItem value="Damascus">Damascus</MenuItem>
                <MenuItem value="Aleppo">Aleppo</MenuItem>
                <MenuItem value="Tartus">Tartus</MenuItem>
                <MenuItem value="Latakia">Latakia</MenuItem>
              </Select>
              {errors.vehicle_governorate && (
                <FormHelperText error>
                  {errors.vehicle_governorate.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
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

export default AddDriver;
