import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../Theme.js";
import { LoginContext } from "../App.jsx";
import { TextField, Button, Grid, FormHelperText } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFetch from "../UseFetch.js";

const schema = yup.object().shape({
  username: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const { request, data, errorStatus } = useFetch(
  //   "http://192.168.43.115:8000/users/login/",
  //   { method: "POST", headers: { "Content-Type": "application/json" } }
  // );

  // useEffect(() => {
  //   if (data) {
  //     // Handle successful login
  //     console.log("Login successful:", data);
  //   }
  // }, [data]);

  // const location = useLocation();
  const navigate = useNavigate();

  const loging = async (data) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://4407-31-9-106-65.ngrok-free.app/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://4407-31-9-106-65.ngrok-free.app",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem("access", responseData.access);
      localStorage.setItem("refresh", responseData.refresh);
      setLoggedIn(true);
      console.log(loggedIn);
      navigate("/", {
        state: {
          previousUrl: location.pathname,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.blueAccent[700]} 100%)`,
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: colors.primary[400],
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(loging)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                fullWidth
                label="Email"
                variant="outlined"
                {...register("username")}
                error={!!errors.username}
                InputLabelProps={{
                  sx: {
                    // Default label color
                    color: colors.grey[100],
                    "&.Mui-focused": {
                      // Label color when focused
                      color: colors.grey[100],
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[600],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[600],
                    },
                  },
                }}
              />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                InputLabelProps={{
                  sx: {
                    // Default label color
                    color: colors.grey[100],
                    "&.Mui-focused": {
                      // Label color when focused
                      color: colors.grey[100],
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.blueAccent[600],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.blueAccent[600],
                    },
                  },
                }}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundImage: `linear-gradient(135deg, ${colors.blueAccent[600]} 0%, ${colors.blueAccent[800]} 100%)`,
                  color: colors.grey[100],
                  padding: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundImage: `linear-gradient(135deg, ${colors.blueAccent[700]} 0%, ${colors.blueAccent[900]} 100%)`,
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
