// src/pages/management/category/CategoryList.jsx
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import { getCategoriesApi } from './service';
import { Link } from 'react-router-dom';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const res = await getCategoriesApi(page);
            setCategories(res.categories);
            setTotalPages(res.totalPages);
            setLoading(false);
        };

        fetchCategories();
    }, [page]);

    return (
        <Box>
            <Box>
                <Link to="/management/category/create">
                    <Button variant="contained">Create New Category</Button>
                </Link>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : categories.length ? (
                            categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Link to={`/management/category/${category.id}`}>
                                            <Button>View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    No Categories Found
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
