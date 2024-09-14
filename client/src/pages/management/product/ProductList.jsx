// src/pages/management/product/ProductList.jsx
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import { getProductsApi } from './service';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = await getProductsApi(page);
            setProducts(res.products);
            setTotalPages(res.totalPages);
            setLoading(false);
        };

        fetchProducts();
    }, [page]);

    return (
        <Box>
            <Box>
                <Link to="/management/product/create">
                    <Button variant="contained">Create New Product</Button>
                </Link>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : products.length ? (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.brand.name}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>
                                        <Link to={`/management/product/${product.id}`}>
                                            <Button>View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No Products Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={totalPages} page={page} onChange={(e, p) => setPage(p)} />
        </Box>
    );
}
