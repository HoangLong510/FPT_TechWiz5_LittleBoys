// src/pages/management/product/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getProductDetailApi, updateProductApi } from './service';
import { getBrandsApi } from '../brand/service';
import { getCategoriesApi } from '../category/service';

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const res = await getProductDetailApi(productId);
            setProduct(res.product);
            setName(res.product.name);
            setBrandId(res.product.brand.id);
            setCategoryId(res.product.category.id);
            setLoading(false);
        };

        const fetchBrands = async () => {
            const res = await getBrandsApi();
            setBrands(res.brands);
        };

        const fetchCategories = async () => {
            const res = await getCategoriesApi();
            setCategories(res.categories);
        };

        fetchProduct();
        fetchBrands();
        fetchCategories();
    }, [productId]);

    const handleSave = async () => {
        setLoading(true);
        const res = await updateProductApi({ id: productId, name, brandId, categoryId });
        if (res.success) {
            setProduct({ ...product, name, brand: brands.find((b) => b.id === brandId), category: categories.find((c) => c.id === categoryId) });
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
                    <Button onClick={handleSave}>Save</Button>
                </Box>
            )}
        </Box>
    );
}
