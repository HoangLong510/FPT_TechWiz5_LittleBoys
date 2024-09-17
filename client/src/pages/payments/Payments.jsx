import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddAddressModal from "./modal/AddAddressModal"; // Import your modal component

export default function Payments() {
  const [memberCode, setMemberCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("");
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);

  // Handle the member code input
  const handleMemberCodeChange = (e) => {
    setMemberCode(e.target.value);
    if (e.target.value === "VIP") {
      setDiscount(20); // 20% discount for VIP members
    } else if (e.target.value === "REGULAR") {
      setDiscount(10); // 10% discount for regular members
    } else {
      setDiscount(0);
    }
  };

  // Handle shipping method change
  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  // Toggle shipping options visibility
  const handleChangeShippingClick = () => {
    setShowShippingOptions(!showShippingOptions);
  };

  // Open and close Add Address modal
  const handleOpenAddAddress = () => setOpenAddAddress(true);
  const handleCloseAddAddress = () => setOpenAddAddress(false);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        backgroundColor: "#f0f0f0",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      {/* Shipping Address */}
      <Box
        sx={{
          mb: 4,
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        {/* Header and Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Shipping Address</Typography>
          <Button color="primary" onClick={handleOpenAddAddress}>
            Add Another Address
          </Button>
        </Box>

        {/* Address Input */}
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{ mt: 2 }}
        />
      </Box>

      {/* Cart Summary */}
      <Box
        sx={{
          mb: 4,
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6">Cart Summary</Typography>
        {/* Example Cart Items */}
        <Typography>Product 1: $30</Typography>
        <Typography>Product 2: $50</Typography>
      </Box>

      {/* Shipping Method */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">Message</Typography>
            <TextField
              label="Leave a message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "213px",
            }}
          >
            <Typography variant="h6">Shipping Method</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangeShippingClick}
            >
              Change Shipping Method
            </Button>
            {showShippingOptions && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="shipping-method-label">
                    Shipping Method
                  </InputLabel>
                  <Select
                    labelId="shipping-method-label"
                    value={shippingMethod}
                    onChange={handleShippingMethodChange}
                    label="Shipping Method"
                  >
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="express">Express</MenuItem>
                    <MenuItem value="bulky">Bulky Items</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Voucher Section */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6">Voucher</Typography>
        <TextField
          label="Enter Voucher Code or Scan"
          variant="outlined"
          fullWidth
          margin="normal"
          value={memberCode}
          onChange={handleMemberCodeChange}
          placeholder="Enter your voucher code"
        />
        {discount > 0 && (
          <Typography variant="body1" color="primary">
            Discount Applied: {discount}%
          </Typography>
        )}
      </Box>

      {/* Order Summary */}
      <Box
        sx={{
          mt: 4,
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
            Order Summary
          </Typography>
          <Box sx={{ textAlign: "right", marginTop: "10px" }}>
            <Typography>Items Total: $80</Typography>
            <Typography>Discount: {discount}%</Typography>
            <Typography>Total Amount: ${80 - (80 * discount) / 100}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          type="submit"
        >
          Confirm Order
        </Button>
      </Box>

      {/* Add Address Modal */}
      <AddAddressModal open={openAddAddress} onClose={handleCloseAddAddress} />
    </Container>
  );
}
