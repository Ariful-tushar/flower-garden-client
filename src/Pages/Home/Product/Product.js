import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import "./Product.css";
import { useHistory } from "react-router";

const Product = ({ flower }) => {
  const { name, description, image, price } = flower;
  const history = useHistory();
  const handlePurchaseButton = () => {
    history.push(`/purchase/${flower._id}`);
  };
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} align="center">
      <Card
        sx={{ maxWidth: 350, minHeight: "40em", backgroundColor: "#fafafa" }}
      >
        <Box>
          <CardMedia
            sx={{ width: "12em", mx: "auto", p: 2 }}
            component="img"
            image={image}
            alt="green iguana"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h2" component="div">
            {price}
          </Typography>
          <Button
            onClick={handlePurchaseButton}
            variant="contained"
            size="large"
          >
            Purchase
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
