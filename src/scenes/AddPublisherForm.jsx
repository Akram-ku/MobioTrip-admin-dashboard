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
    .min(9, "Password must be at least 9 characters"),
  gender: yup.string().required("Gender is required"),
  birth_date: yup.date().required("Birth Date is required"),
  username: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const AddPublisherForm = () => {
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
    },
  });

  const onSubmit = async (data) => {
    // Convert birth_date to string format YYYY-MM-DD
    data.birth_date = new Date(data.birth_date).toISOString().split("T")[0];

    console.log("Submitting data:", data);

    try {
      const response = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/employees/publishers/hire/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify(data),
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
        <h1>Add Publisher</h1>
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
                type="email"
                fullWidth
                label="Email"
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

export default AddPublisherForm;
