import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Card,
  Box,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { CircularProgress } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import swal from "sweetalert";
import UserAuthStore from "../../zustand/UserAuthStore";

//STYLING
const root = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#F5F5F5",
};
const loginCard = {
  width: "350px",
  m: 1,
};
const loginForm = {
  display: "flex",
  flexDirection: "column",
};
const fields = {
  m: 1,
};

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    showPassword: false,
    showPassword2: false,
    loading: false,
  });
  const navigate = useNavigate();

  const signUpUser = UserAuthStore((state) => state.signUpUser);
  const token = UserAuthStore((state) => state.token);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setValues({
      ...values,
      showPassword2: !values.showPassword2,
    });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setValues({ ...values, loading: true });
    try {
      const { name, email, password, password2 } = values;
      if (!name || !email || !password || !password2) {
        return swal("Oops!", `Missing required field`, "error");
      } else if (password !== password2) {
        return swal("Oops!", `Password does not match!`, "error");
      }

      await signUpUser({ ...values });

      swal({
        title: "Good Job!",
        text: `Successfully registered`,
        icon: "success",
        buttons: {
          ok: "OK",
        },
        dangerMode: true,
      }).then(() => {
        setValues({ ...values, loading: false });
        navigate("/");
      });
    } catch (error) {
      setValues({ ...values, loading: false });
      return swal("Oops!", `${error.message}`, "error");
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <Box sx={root}>
      <Card sx={loginCard}>
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            margin: "15px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: 1,
          }}
        >
          <HowToRegIcon /> SIGN-UP
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={loginForm}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={values.name}
              type="name"
              onChange={handleChange("name")}
              sx={fields}
            />
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange("email")}
              sx={fields}
            />
            <FormControl sx={fields} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={fields} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
                name="confirm-password"
                type={values.showPassword2 ? "text" : "password"}
                value={values.password2}
                onChange={handleChange("password2")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge="end"
                    >
                      {values.showPassword2 ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={fields}
              startIcon={
                values.loading && <CircularProgress size={20} color="warning" />
              }
            >
              Sign-up
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ...fields, color: "text.primary" }}
              component={Link}
              to="/"
            >
              Sign-in
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
