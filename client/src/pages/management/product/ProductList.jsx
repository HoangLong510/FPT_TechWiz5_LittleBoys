import { useEffect, useState } from 'react';
import {
  Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Pagination, Stack, Button, IconButton, Tooltip, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProductsApi, deleteProductApi } from './service'; // Import API services
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = { search, page };
      const res = await getProductsApi(data);
      if (res.success) {
        if (res.data.length === 0 && search) {
          setProducts([]);
          setTotalPage(1);
        } else {
          setProducts(res.data);
          setTotalPage(res.totalPages || 1);
        }
      } else {
        setError(t("No products found."));
        setProducts([]);
      }
    } catch (error) {
      setError(t("Error fetching products."));
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCreateProduct = () => {
    navigate('/management/products/create');
  };

  const handleEdit = (id) => {
    navigate(`/management/products/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this product?'))) {
      try {
        await deleteProductApi(id);
        fetchProducts(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };


  return (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_PROJECT_NAME} | {t("ProductManagement")}</title>
      </Helmet>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        userSelect: 'none'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '40px'
        }}>
          <Box sx={{ fontWeight: 'bold' }}>
            {t("ProductList")}
          </Box>
          <Button variant="contained" color="primary" onClick={handleCreateProduct}>
            {t("Add New Product")}
          </Button>
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            size="small"
            id="search"
            label={t("Search")}
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
                <TableCell sx={{ color: '#fff', width: '10%' }}>{t("ID")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '20%' }}>{t("Name")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '15%' }}>{t("Image")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '15%' }}>{t("Category")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '15%' }}>{t("Brand")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '10%' }}>{t("Price")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '15%' }}>{t("Quantity")}</TableCell>
                <TableCell sx={{ color: '#fff', width: '10%' }}>{t("Action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
                      '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' }
                    }}
                  >
                    <TableCell sx={{ fontSize: '14px' }}>{product.id}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{product.name}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>
                      {product.image ? (
                        <img
                          src={`${product.image}?${new Date().getTime()}`}
                          alt={product.name}
                          style={{ width: '100px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : 'No image'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{product.category?.name || 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{product.brand?.name || 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{product.price}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>{product.quantity}</TableCell>
                    <TableCell sx={{ fontSize: '14px' }}>
                      <Tooltip title={t("Edit")}>
                        <IconButton onClick={() => handleEdit(product.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("Delete")}>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {search ? t("No data") : t("No data")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
          <Stack spacing={2}>
            <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary" />
          </Stack>
        </Box>

        {error && (
          <Box sx={{ width: '100%' }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
    </>
  );
}
