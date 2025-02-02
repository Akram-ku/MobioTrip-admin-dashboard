import React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { tokens } from "../Theme";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  birthDate: yup.date().required("Birth date is required"),
});

const EditProfile = ({ onSave }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSave(data);
    navigate("/settings");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ""}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: errors.title
                ? theme.palette.error.main
                : colors.grey[200],
            },
            "& label.Mui-focused": {
              color: colors.grey[100],
            },
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: errors.title
                ? theme.palette.error.main
                : colors.grey[200],
            },
            "& label.Mui-focused": {
              color: colors.grey[100],
            },
          }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: errors.title
                ? theme.palette.error.main
                : colors.grey[200],
            },
            "& label.Mui-focused": {
              color: colors.grey[100],
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: errors.title
                ? theme.palette.error.main
                : colors.grey[200],
            },
            "& label.Mui-focused": {
              color: colors.grey[100],
            },
          }}
        />
        <TextField
          fullWidth
          label="Birth Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("birthDate")}
          error={!!errors.birthDate}
          helperText={errors.birthDate ? errors.birthDate.message : ""}
          sx={{ mb: 2 }}
        />
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
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
