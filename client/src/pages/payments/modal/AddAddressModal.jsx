import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material";

const AddAddressModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Set maxWidth for larger modal
      fullWidth
    >
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h6">Địa chỉ của tôi</Typography>
        
      </DialogTitle>
      <DialogContent sx={{ width: 900 }}> {/* Set a fixed width for the content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Box>
                    <Typography variant="body1">Họ Tên</Typography>
                    <Typography variant="body2">Sdt</Typography>
                    <Typography variant="body2">Địa chỉ</Typography>
                  </Box>
                }
              />
              <Button variant="outlined" color="primary" >
                Update
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ marginLeft:'300px' }}>
        <Button onClick={onClose} color="primary">
          Confirm
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressModal;
