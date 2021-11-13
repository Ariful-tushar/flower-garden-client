import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Product from "../Home/Product/Product";
import Navigation from "../Shared/Navigation/Navigation";

const Explore = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetch("https://salty-refuge-81645.herokuapp.com/flowers")
      .then((res) => res.json())
      .then((data) => {
        // const newData = data.slice(0, 6);
        setFlowers(data);
      });
  }, [flowers]);

  return (
    <div>
      <Navigation></Navigation>
      <Container>
        <Typography
          sx={{ fontWeight: 500, m: 2, color: "success.main" }}
          variant="h1"
          component="div"
        >
          Products
        </Typography>

        <Grid
          alignItems="center"
          justify="center"
          container
          spacing={{ xs: 2, md: 3, lg: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        >
          {flowers.map((flower) => (
            <Product key={flower._id} flower={flower}></Product>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Explore;
