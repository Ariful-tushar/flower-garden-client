import { Grid } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import "./Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Review = ({ userReview }) => {
  const { name, image, review, rating } = userReview;
  const fullStar = <FontAwesomeIcon icon={faStar} />;

  return (
    <Grid item xs={4} sm={4} md={4} lg={4}>
      <Box className="fg-review-bg">
        <Typography variant="body1" sx={{ pt: "8em" }}>
          "{review}"
        </Typography>
        <img src={image} alt="user" className="fg-reviewer-image" />
        <Typography variant="h6">{name}</Typography>
        <Rating
          initialRating={rating}
          emptySymbol="far fa-star"
          fullSymbol={fullStar}
          readonly="true"
        ></Rating>
      </Box>
    </Grid>
  );
};

export default Review;
