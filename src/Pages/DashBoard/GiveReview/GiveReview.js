import { Alert, Button, Container, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import useAuth from "./../../../Hooks/useAuth";
import Rating from "react-rating";

const GiveReview = () => {
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    let image = user.photoURL;
    if (!image) {
      image = "https://i.ibb.co/TgnkKXD/pngwing-com.png";
    }
    const reviewData = { ...data, rating, image };
    console.log(reviewData);

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset(data);
          setReviewSuccess(true);
        }
      });
  };

  const handleAnotherReview = () => {
    // history.push("/dashboard/feedback");
    setReviewSuccess(false);
  };

  if (reviewSuccess) {
    return (
      <Container>
        {reviewSuccess && (
          <Alert sx={{ my: 5, width: "75%", mx: "auto" }} severity="success">
            Thanks for your review! The review will be visible after some time.
          </Alert>
        )}
        <Button onClick={handleAnotherReview} variant="text">
          Want to give another review?
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5">Please Give A review</Typography>
      <Paper sx={{ p: 4, my: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Full Name"
              variant="outlined"
              type="text"
              {...register("name")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Email"
              value={user.email}
              variant="outlined"
              type="email"
              {...register("email")}
            />
          </Box>
          <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
            <TextField
              fullWidth
              placeholder="Feedback Text"
              id="outlined-basic"
              variant="outlined"
              type="text"
              {...register("review")}
            />
          </Box>
          <Box
            sx={{
              width: "75%",
              mx: "auto",
              textAlign: "left",
              alignItems: "start",
              my: 2,
            }}
          >
            <Typography sx={{ display: "inline", mr: 2 }} variant="h5">
              Rating :
            </Typography>

            <Rating
              size={36}
              fullSymbol="fas fa-star"
              emptySymbol="far fa-star"
              onChange={(value) => setRating(value)}
            />
          </Box>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default GiveReview;
