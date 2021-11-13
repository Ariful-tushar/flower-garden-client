import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Navigation from "../../Shared/Navigation/Navigation";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import useAuth from "../../../Hooks/useAuth";
import { useHistory } from "react-router";

const Login = () => {
  const { registerUserWithEmail } = useAuth();
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    registerUserWithEmail(
      data.email,
      data.password,
      `${data.firstName} ${data.lastName}`,
      history
    );
    reset(data);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Navigation></Navigation>
      <Container sx={{ my: "5em" }}>
        <Box>
          <Typography variant="h3">
            Please Enter the following details
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="First Name"
              variant="outlined"
              {...register("firstName")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              placeholder="Last Name"
              id="outlined-basic"
              variant="outlined"
              {...register("lastName")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              placeholder="Email"
              id="outlined-basic"
              type="email"
              variant="outlined"
              {...register("email")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              placeholder="Password"
              id="outlined-basic"
              type="password"
              variant="outlined"
              {...register("password")}
            />
          </Box>

          <Button variant="contained" type="submit">
            Submit
          </Button>
          <br />
          <Button sx={{ my: 2 }} onClick={handleLogin} variant="contained">
            Already Registered? Login here
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
