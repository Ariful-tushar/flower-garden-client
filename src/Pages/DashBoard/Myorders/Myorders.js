import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "./../../../Hooks/useAuth";

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

const Myorders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`)
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

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Delivery Time</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.name}>
                <StyledTableCell
                  sx={{ width: "25%" }}
                  component="th"
                  scope="row"
                >
                  {order.productDetails.name}
                </StyledTableCell>

                <StyledTableCell align="right" sx={{ width: "20%" }}>
                  <img
                    style={{ width: "50%", mx: "auto" }}
                    src={order.productDetails.image}
                    alt=""
                  />
                </StyledTableCell>

                <StyledTableCell sx={{ width: "20%" }} align="right">
                  {order.productDetails.price}
                </StyledTableCell>

                <StyledTableCell sx={{ width: "20%" }} align="right">
                  {order.productDetails.deliverTime}
                </StyledTableCell>

                <StyledTableCell sx={{ width: "20%" }} align="right">
                  {order.status}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    onClick={() => {
                      handleDeleteButton(order._id);
                    }}
                    sx={{ color: "red" }}
                    startIcon={<DeleteIcon />}
                  >
                    Cancel
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

export default Myorders;
