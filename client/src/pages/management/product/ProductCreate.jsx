// src/pages/management/product/ProductCreate.jsx
import { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createProductApi } from './service';
import { getBrandsApi } from '../brand/service';
import { getCategoriesApi } from '../category/service';
import { useNavigate } from 'react-router-dom';

export default function ProductCreate() {
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            const res = await getBrandsApi();
            setBrands(res.brands);
        };

        const fetchCategories = async () => {
            const res = await getCategoriesApi();
            setCategories(res.categories);
        };

        fetchBrands();
        fetchCategories();
    }, []);

    const handleCreate = async () => {
        const res = await createProductApi({ name, brandId, categoryId });
        if (res.success) {
            navigate('/management/product');
        }
    };

    return (
        <Box>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Product Name"
                variant="outlined"
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    label="Brand"
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    label="Category"
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleCreate}>Create</Button>
        </Box>
    );
}
