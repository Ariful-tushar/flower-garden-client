import { Link } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";

const Payment = () => {
  const history = useHistory();

  const handleButton = (historys) => {
    history.push(historys);
  };

  return (
    <div>
      <h2>The payment system is coming soon!</h2>
      <Button
        sx={{ m: 3 }}
        onClick={() => {
          handleButton("/home");
        }}
        variant="contained"
      >
        Go to Home
      </Button>
      <Button
        onClick={() => {
          handleButton("/dashboard");
        }}
        variant="contained"
      >
        Go to DashBoard
      </Button>
    </div>
  );
};

export default Payment;
