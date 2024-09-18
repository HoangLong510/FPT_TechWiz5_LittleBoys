import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBrandsApi, deleteBrandApi } from './service';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const data = { search, page };
            const res = await getBrandsApi(data);
            if (res.brands) {
                setBrands(res.brands);
                setTotalPage(res.totalPages);
                setPage(res.currentPage);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, [search, page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const { t } = useTranslation();

    const handleCreateBrand = () => {
        navigate('/management/brands/create');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            try {
                await deleteBrandApi(id);
                fetchBrands();
            } catch (error) {
                console.error('Error deleting brand:', error);
            }
        }
    };


    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("ManagementBrands")}</title>
            </Helmet>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px' }}>
                    <Box sx={{ fontWeight: 'bold' }}>
                        {t("BRANDMANAGEMENT")}
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleCreateBrand}>
                        {t("Add New Brand")}
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    size="small"
                    id="search"
                    label="Search..."
                    variant="outlined"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer component={Paper} sx={{ border: '1px solid #e6e6e6', boxShadow: 'none', maxHeight: '400px', overflow: 'auto' }}>
                    <Table sx={{ minWidth: 650, fontSize: '14px' }}>
                        <TableHead>
                            <TableRow sx={{ textTransform: 'uppercase', backgroundColor: '#000' }}>
                                <TableCell sx={{ color: '#fff', width: '15%' }}>{t("ID")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '40%' }}>{t("Name")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '25%' }}>{t("Image")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '20%' }}>{t("Created At")}</TableCell>
                                <TableCell sx={{ color: '#fff', width: '10%' }}>{t("Action")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && brands.length > 0 && brands.map((brand) => (
                                <TableRow
                                    key={brand.id}
                                    onClick={() => navigate(`/management/brands/${brand.id}`)}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
                                        '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' }
                                    }}
                                >
                                    <TableCell sx={{ fontSize: '14px' }}>{brand.id}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>{brand.name}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>
                                        {brand.image ? (
                                            <img
                                                src={brand.image} // Đường dẫn đã được cấu hình chính xác từ API
                                                alt={brand.name}
                                                style={{ width:'100px', height:'80px' , objectFit: 'cover' }}
                                                onError={() => console.log('Failed to load image:', brand.image)}
                                            />
                                        ) : (
                                            'No image'
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>{brand.created_at}</TableCell>
                                    <TableCell sx={{ fontSize: '14px' }}>
                                        <IconButton
                                            onClick={(e) => { e.stopPropagation(); handleDelete(brand.id); }}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && brands.length === 0 && (
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

                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                    <Stack spacing={2}>
                        <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary" />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
