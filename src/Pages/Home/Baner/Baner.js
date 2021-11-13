import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import "./Baner.css";

const Baner = () => {
  return (
    <Box className="fg-baner-background">
      <Box sx={{ mx: 10, py: 35, px: 20, width: "25%", heigh: 100 }}>
        <Typography sx={{ my: 2 }} variant="h2" align="left">
          Find your own happiness
        </Typography>

        <Typography sx={{ my: 2 }} variant="body1" align="left">
          The best gifts for those you love. Fresh flower delivery
        </Typography>
        <Button
          sx={{ my: 2 }}
          className="fg-baner-button"
          variant="contained"
          color="primary"
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
};

export default Baner;
