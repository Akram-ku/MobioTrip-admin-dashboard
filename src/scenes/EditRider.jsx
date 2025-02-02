import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../components/Header";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  birth_date: yup.date().required("Birth date is required").nullable(),
  username: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
});

const EditRider = () => {
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
    const fetchRider = async () => {
      try {
        const response = await fetch(
          `https://4407-31-9-106-65.ngrok-free.app/users/riders/${id}`,
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

    fetchRider();
  }, [id]);

  const onSubmit = async (formData) => {
    try {
      await fetch(
        `https://4407-31-9-106-65.ngrok-free.app/users/riders/${id}/`,
        {
          method: "PUT",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify(formData),
        }
      );
      navigate("/riders");
    } catch (error) {
      console.error("Error updating rider:", error);
    }
  };

  if (!driver) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Header title="Edit Rider" subtitle="Edit Rider Details" />
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
          label="Phone Number"
          fullWidth
          margin="normal"
          {...register("username")}
          defaultValue={driver.username}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
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
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditRider;
