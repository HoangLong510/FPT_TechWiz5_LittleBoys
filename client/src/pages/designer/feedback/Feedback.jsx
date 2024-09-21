import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';

export default function Feedback() {
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title: selectedOption === 'Khác' ? customOption : selectedOption, description, image });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Gửi yêu cầu Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Chọn tiêu đề"
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  if (e.target.value !== 'Khác') {
                    setCustomOption(''); // Reset custom option if not selected
                  }
                }}
                variant="outlined"
                required
              >
                <MenuItem value="Thêm mới">Thêm mới</MenuItem>
                <MenuItem value="Cập nhật">Cập nhật</MenuItem>
                <MenuItem value="Xóa">Xóa</MenuItem>
                <MenuItem value="Khác">Khác</MenuItem>
              </TextField>
            </Grid>
            {selectedOption === 'Khác' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nhập tiêu đề khác"
                  variant="outlined"
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: '100%', marginBottom: 16 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Gửi Yêu Cầu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}