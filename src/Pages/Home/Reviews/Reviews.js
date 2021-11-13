import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Container, Grid, Typography } from "@mui/material";
import Review from "../Review/Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://salty-refuge-81645.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <Box sx={{ my: "10em" }}>
      <Container>
        <Typography variant="h4">What Our Clients Say</Typography>
        <Grid
          alignItems="center"
          justify="center"
          container
          spacing={{ xs: 2, md: 3, lg: 4 }}
          //   style={{ gap: 15 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {reviews.map((review) => (
            <Review key={review.id} userReview={review}></Review>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Reviews;
