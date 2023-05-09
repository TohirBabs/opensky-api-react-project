import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://devpanda.netlify.app/">
        dev_panda🐼
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("email") == "traveler@gmail.com" &&
      data.get("password") == "iloveflying"
    ) {
      navigate("dashboard");
    } else {
      alert("Incorrect login details");
    }
  };

  return (
    <Grid
      container
      component={Paper}
      elevation={6}
      square
      sx={{
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          backgroundImage: "url(login.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          sx={{
            m: 4,
            mt: 10,
            mr: 10,
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography component="h1" color="#fff" fontSize="3rem">
            Hamoye Flight Tracker
          </Typography>
          <Typography color="#fff">
            Helping you keep track of all your flights all around the world
            while you get to eat doughnuts ✈
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            my: 8,
            mx: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/airplane-icon.png" />
          <Typography
            component="h1"
            fontSize="1.2rem"
            color="#1976d2"
            sx={{
              display: { sm: "none" },
              mb: "2rem",
            }}
          >
            Hamoye Flight Tracker
          </Typography>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => alert("passsword: iloveflying")}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
