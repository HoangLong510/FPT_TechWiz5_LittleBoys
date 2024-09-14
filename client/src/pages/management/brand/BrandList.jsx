import { useEffect, useState } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField as MuiTextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBrandsApi, createBrandApi } from './service'; // Import your API service

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false); // State to control the open/close state of the dialog
    const [newBrandName, setNewBrandName] = useState(''); // State to handle new brand name input
    const navigate = useNavigate();

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const data = { search, page };
            const res = await getBrandsApi(data);
            if (res.brands) {
                setBrands(res.brands);
                setTotalPage(res.totalPage);
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

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleCreateBrand = async () => {
        try {
            await createBrandApi({ name: newBrandName });
            setNewBrandName(''); // Clear input field
            setOpen(false); // Close dialog
            fetchBrands(); // Refresh the list of brands
        } catch (error) {
            console.error('Error creating brand:', error);
        }
    };

    return (
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
                    BRAND MANAGEMENT
                </Box>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Create Brand
                </Button>
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
                <TextField
                    fullWidth
                    size="small"
                    id="search"
                    label="Search..."
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
                            <TableCell sx={{ color: '#fff', width: '20%' }}>ID</TableCell>
                            <TableCell sx={{ color: '#fff', width: '60%' }}>Name</TableCell>
                            <TableCell sx={{ color: '#fff', width: '20%' }}>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && brands.length > 0 && brands.map((brand) => (
                            <TableRow
                                key={brand.id}
                                onClick={() => navigate(`/management/brands/${brand.id}`)}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        cursor: 'pointer',
                                    }
                                }}
                            >
                                <TableCell sx={{ fontSize: '14px' }}>{brand.id}</TableCell>
                                <TableCell sx={{ fontSize: '14px' }}>{brand.name}</TableCell>
                                <TableCell sx={{ fontSize: '14px' }}>{brand.created_at}</TableCell>
                            </TableRow>
                        ))}
                        {!loading && brands.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No data</TableCell>
                            </TableRow>
                        )}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
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

            {/* Dialog to create a new brand */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Create Brand</DialogTitle>
                <DialogContent>
                    <MuiTextField
                        autoFocus
                        margin="dense"
                        id="brandName"
                        label="Brand Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleCreateBrand} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
