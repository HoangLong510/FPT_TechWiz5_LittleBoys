// src/pages/management/category/CategoryCreate.jsx
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { createCategoryApi } from './service';
import { useNavigate } from 'react-router-dom';

export default function CategoryCreate() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        const res = await createCategoryApi({ name });
        if (res.success) {
            navigate('/management/category');
        }
    };

    return (
        <Box>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Category Name"
                variant="outlined"
                fullWidth
            />
            <Button onClick={handleCreate}>Create</Button>
        </Box>
    );
}
