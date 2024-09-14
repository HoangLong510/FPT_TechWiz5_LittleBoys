// src/pages/management/brand/BrandCreate.jsx
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { createBrandApi } from './service'; // API service để gửi dữ liệu
import { useNavigate } from 'react-router-dom';

export default function BrandCreate() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!name) {
            alert("Brand name is required.");
            return;
        }
    
        setLoading(true);
        const res = await createBrandApi({ name });
        setLoading(false);
    
        if (res.success) {
            navigate('/management/brands'); // Quay lại danh sách thương hiệu sau khi tạo thành công
        } else {
            alert(res.message || "Failed to create brand.");
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Create New Brand
            </Typography>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Brand Name"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create"}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/management/brands')}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
