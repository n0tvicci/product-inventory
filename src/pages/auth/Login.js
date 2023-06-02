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
import UserAuthStore from "../../zustand/UserAuthStore";
import swal from "sweetalert";

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

export default function Login() {
  const [values, setValues] = useState({
    email: "johnmichaelvicmudo.work@gmail.com",
    password: "123456",
    showPassword: false,
    loading: false,
  });
  const navigate = useNavigate();

  const signInUser = UserAuthStore((state) => state.signInUser);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    try {
      const { email, password } = values;
      if (!email || !password) {
        return swal("Oops!", `Missing required field`, "error");
      }

      await signInUser({ email, password });
      setValues({ ...values, loading: false });
      navigate("/dashboard");
    } catch (error) {
      setValues({ ...values, loading: false });
      return swal("Oops!", `${error.message}`, "error");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  return (
    <Box sx={root}>
      <Card sx={loginCard}>
        <Typography variant="h5" color="text.primary" sx={{ margin: "15px" }}>
          SIGN-IN
        </Typography>
        <Alert severity="info" sx={{ m: 1 }}>
          Deployed on a free tier service. Might take time to load
        </Alert>
        <form onSubmit={handleSubmit}>
          <Box sx={loginForm}>
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
            <Button
              variant="contained"
              type="submit"
              sx={fields}
              startIcon={
                values.loading && <CircularProgress size={20} color="warning" />
              }
            >
              Sign-in
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ...fields, color: "text.primary" }}
              component={Link}
              to="/signup"
            >
              Sign-up
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}
