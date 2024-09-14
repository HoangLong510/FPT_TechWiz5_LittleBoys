// src/pages/management/category/CategoryDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { getCategoryDetailApi, updateCategoryApi } from './service';

export default function CategoryDetail() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            const res = await getCategoryDetailApi(categoryId);
            setCategory(res.category);
            setName(res.category.name);
            setLoading(false);
        };

        fetchCategory();
    }, [categoryId]);

    const handleSave = async () => {
        setLoading(true);
        const res = await updateCategoryApi({ id: categoryId, name });
        if (res.success) {
            setCategory({ ...category, name });
        }
        setLoading(false);
    };

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Category Name"
                        variant="outlined"
                        fullWidth
                    />
                    <Button onClick={handleSave}>Save</Button>
                </Box>
            )}
        </Box>
    );
}
