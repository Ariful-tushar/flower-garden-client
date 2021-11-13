import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "./../../../Hooks/useAuth";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageAllOrders = () => {
  const [status, setStatus] = React.useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [orders]);

  const handleDeleteButton = (id) => {
    const getConfirmation = window.confirm(
      "Are you sure to cancel this order?"
    );
    if (!getConfirmation) {
      return;
    }
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deleteCount > 0) {
          setOrders(orders.filter((order) => order._id !== id));
        }
      });
  };

  const handleChange = (event, id) => {
    const getConfirmation = window.confirm(
      "Are you sure to update status for this order?"
    );
    if (!getConfirmation) {
      return;
    }
    setStatus(event.target.value);
    const newStatusData = { status: event.target.value };
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newStatusData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          setSuccess(true);
        }
      });
  };
  return (
    <Container sx={{ minWidth: "100%" }}>
      {success && <Alert severity="success">Status Update Successfully!</Alert>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Customer Email</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Delivery Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.name}>
                <StyledTableCell align="center" component="th" scope="row">
                  {order.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.productDetails.name}
                </StyledTableCell>

                <StyledTableCell align="center" sx={{ width: "10%" }}>
                  <img
                    style={{ width: "80%", mx: "auto" }}
                    src={order.productDetails.image}
                    alt=""
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  {order.productDetails.price}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {order.productDetails.deliverTime}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {/* {order.status} */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {order.status}
                    </InputLabel>
                    <Select
                      onFocus={() => setSuccess(false)}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={order.status}
                      label="Age"
                      onChange={(event) => handleChange(event, order._id)}
                    >
                      <MenuItem value={"Pending"}>Pending</MenuItem>
                      <MenuItem value={"Approved"}>Approved</MenuItem>
                      <MenuItem value={"Shipped"}>Shipped</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    onClick={() => {
                      handleDeleteButton(order._id);
                    }}
                    sx={{ color: "red" }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageAllOrders;
