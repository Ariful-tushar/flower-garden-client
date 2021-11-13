import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Link,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (data) => {
    fetch("http://localhost:5000/users/makeadmin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setSuccess(true);
          reset(data);
        } else {
          setError(true);
          reset();
        }
      });
  };

  if (success) {
    return (
      <Container>
        <Paper>
          {success && (
            <Alert severity="success">Made Admin successfully!</Alert>
          )}
        </Paper>
        <Button onClick={setSuccess(false)}>Make another admin</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography sx={{ my: 5 }} variant="h3">
        Make an Adming
      </Typography>
      {error && (
        <Alert severity="error">
          Email not exists. Try with differnt email!
        </Alert>
      )}
      <Paper sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "50%", mx: "auto", my: 2 }}>
            <TextField
              onFocus={() => setError(false)}
              fullWidth
              id="outlined-basic"
              placeholder="Email"
              variant="outlined"
              type="email"
              {...register("email")}
            />
          </Box>

          <Button variant="contained" type="submit">
            Make Admin
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default MakeAdmin;
