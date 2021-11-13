import { Typography } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";

const Footer = () => {
  const copyright = <FontAwesomeIcon icon={faCopyright} />;
  return (
    <div>
      <Box
        sx={{
          minHeight: "15em",
          backgroundColor: "black",
          color: "white",
          py: "8em",
        }}
        variant="body1"
        align="center"
      >
        <Typography variant="body1">
          Ariful Tushar {copyright} All Rights Reserved
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
