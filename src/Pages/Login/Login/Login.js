import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navigation from "./../../Shared/Navigation/Navigation";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import useAuth from "./../../../Hooks/useAuth";

const Login = () => {
  const { user, loginUserWithEmail } = useAuth();

  const { register, handleSubmit, reset } = useForm();
  const location = useLocation();
  const history = useHistory();
  const onSubmit = (data) => {
    loginUserWithEmail(data.email, data.password, location, history);
  };
  return (
    <div>
      <Navigation></Navigation>
      <Container sx={{ my: "5em" }}>
        <Box>
          <Typography variant="h3">Please Login</Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Email"
              variant="outlined"
              type="email"
              {...register("email")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              placeholder="Password"
              id="outlined-basic"
              variant="outlined"
              type="password"
              {...register("password")}
            />
          </Box>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
