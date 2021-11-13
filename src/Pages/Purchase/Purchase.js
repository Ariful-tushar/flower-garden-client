import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Navigation from "../Shared/Navigation/Navigation";
import { useForm } from "react-hook-form";
import useAuth from "./../../Hooks/useAuth";

const Purchase = () => {
  const { flowerId } = useParams();
  const { user } = useAuth();
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [flower, setFlower] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/flowers/${flowerId}`)
      .then((res) => res.json())
      .then((data) => setFlower(data));
  }, []);

  const onSubmit = (data) => {
    let orderData = { ...data, productDetails: flower, status: "Pending" };

    console.log(orderData);
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((orderData) => {
        setBookingSuccess(true);
        reset(orderData);
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Navigation></Navigation>
      <Typography sx={{ my: 5 }} variant="h3">
        Order By Your Choice
      </Typography>

      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 5, width: "75%", mx: "auto", my: 3 }}>
            <img style={{ width: "75%" }} src={flower.image} alt="" />
            <Typography variant="h5">{flower.name}</Typography>
            <Typography variant="body1">{flower.description}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{flower.price}</Typography>
              <Typography variant="h6">{flower.deliverTime}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid sx={{}} item xs={12} md={6} lg={6}>
          <Paper sx={{ mx: "auto", p: 5, width: "75%", my: "15vh" }}>
            {bookingSuccess && (
              <Alert sx={{ width: "75%", mx: "auto" }} severity="success">
                Ordered placed successfully! The product will be delivered soon.
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  id="outlined-basic"
                  variant="outlined"
                  {...register("name")}
                />
              </Box>
              <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  placeholder="Email"
                  type="email"
                  value={user.email}
                  variant="outlined"
                  {...register("email")}
                />
              </Box>
              <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  {...register("phone")}
                />
              </Box>
              <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Address"
                  id="outlined-basic"
                  variant="outlined"
                  {...register("address")}
                />
              </Box>

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Purchase;
