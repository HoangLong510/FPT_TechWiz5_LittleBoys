import { useEffect, useState } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination, Stack, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategoriesApi, deleteCategoryApi } from './service'; // Import API services
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = { search, page };
            const res = await getCategoriesApi(data);
            if (res.categories) {
                setCategories(res.categories);
                setTotalPage(res.totalPages);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [search, page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const { t } = useTranslation();

    const handleCreateCategory = () => {
        navigate('/management/categories/create'); // Điều hướng đến trang CategoryCreate
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategoryApi(id);
                fetchCategories(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    // Đặt URL gốc của máy chủ lưu trữ hình ảnh

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("ManagementCategories")}</title>
            </Helmet>

            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: '20px',
                userSelect: 'none'
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '40px'
                }}>
                    <Box sx={{ fontWeight: 'bold' }}>
                        {t("CATEGORYMANAGEMENT")}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                        {t("Create Category")}
                    </Button>
                </Box>

                <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        size="small"
                        id="search"
                        label={t("Search...")}
                        variant="outlined"
                        autoComplete="off"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ border: '1px solid #e6e6e6', boxShadow: 'none', maxHeight: '400px', overflow: 'auto' }}>
                    <Table sx={{ minWidth: 650, fontSize: '14px' }}>
                        <TableHead>
                            <TableRow sx={{ textTransform: 'uppercase', backgroundColor: '#000' }}>
                                <TableCell sx={{ color: '#fff', width: '15%' }}>ID</TableCell>
                                <TableCell sx={{ color: '#fff', width: '40%' }}>{t("Name")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '25%' }}>{t("Image")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '20%' }}>{t("Created At")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '10%' }}>{t("Action")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && categories.length > 0 && categories.map((category) => (
                                <TableRow
                                    key={category.id}
                                    onClick={() => navigate(`/management/categories/${category.id}`)}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'pointer',
                                        }
                                    }}
                                >
                                    <TableCell sx={{ fontSize: '14px' }}>{category.id}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>{category.name}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>
                                        {category.image ? (
                                            <img
                                                src={category.image} // Sử dụng đường dẫn hình ảnh chính xác
                                                alt={category.name}
                                                style={{ width:'100px', height: '80px' ,  objectFit: 'cover' }}
                                            />
                                        ) : (
                                            'No image'
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>{category.created_at}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>
                                        <IconButton
                                            onClick={(e) => { e.stopPropagation(); handleDelete(category.id); }}
                                            color="error" // Set color to red
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No data</TableCell>
                                </TableRow>
                            )}
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary" />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
