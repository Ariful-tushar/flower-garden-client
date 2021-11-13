import { Alert, Container } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const onsubmit = (data) => {
    const getConfirmation = window.confirm(
      "Are you sure you want to Add this product?"
    );
    if (!getConfirmation) {
      return;
    }
    fetch("http://localhost:5000/flowers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset(data);
          setSuccess(true);
        }
      });
  };
  return (
    <Container>
      {success && (
        <Alert sx={{ width: "75%", mx: "auto" }} severity="success">
          Product Added Successfully!
        </Alert>
      )}
      <Typography variant="h3">Add a new product to Database</Typography>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
          <TextField
            onFocus={() => setSuccess(false)}
            fullWidth
            id="outlined-basic"
            placeholder="Product Name"
            variant="outlined"
            {...register("name")}
          />
        </Box>
        <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
          <TextField
            fullWidth
            placeholder="Description"
            id="outlined-basic"
            variant="outlined"
            {...register("description")}
          />
        </Box>
        <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
          <TextField
            fullWidth
            placeholder="Price"
            id="outlined-basic"
            type="number"
            variant="outlined"
            {...register("price")}
          />
        </Box>
        <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
          <TextField
            fullWidth
            placeholder="Image SRC"
            id="outlined-basic"
            type="text"
            variant="outlined"
            {...register("image")}
          />
        </Box>
        <Box sx={{ width: "75%", mx: "auto", my: 2 }}>
          <TextField
            fullWidth
            placeholder="Delivery Time"
            id="outlined-basic"
            type="text"
            variant="outlined"
            {...register("deliverTime")}
          />
        </Box>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
