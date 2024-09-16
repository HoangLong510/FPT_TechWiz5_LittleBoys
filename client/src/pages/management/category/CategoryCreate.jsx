import { Box, Button, CircularProgress, TextField, Snackbar, Alert, Input } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createCategoryApi } from "./service"; // Import API service để tạo danh mục mới

export default function CategoryCreate() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [name, setName] = useState(''); // Tên danh mục
    const [image, setImage] = useState(null); // Hình ảnh danh mục
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCreate = async () => {
        setLoading(true);
        setOpenSnackbar(false);

        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await createCategoryApi(formData);
            if (res.success) {
                setSnackbarMessage(t("Category created successfully!"));
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/management/categories'), 500);
            } else {
                setSnackbarMessage(res.message || 'Failed to create category.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage('Failed to create category. Please try again later.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/management/categories'); // Quay lại danh sách danh mục
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("CreateCategory")}</title>
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
                        {t("CreateCategory")}
                    </Box>
                    <Button onClick={handleBack}>
                        {t("Back to List")}
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px'
                    }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={t("Category Name")}
                            variant="standard"
                            required
                        />

                        <Input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            inputProps={{ accept: 'image/*' }}
                            fullWidth
                            margin="none"
                            sx={{ marginTop: 2 }}
                        />

                        <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleCreate}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : t("Create")}
                            </Button>
                        </Box>

                        <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleBack}
                            >
                                {t("Back")}
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Snackbar for notifications */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    sx={{ 
                        '& .MuiSnackbarContent-root': { 
                            width: 'auto', 
                            maxWidth: '600px' // Tùy chỉnh kích thước rộng nhất của Snackbar
                        }
                    }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbarSeverity}
                        sx={{ 
                            width: '100%', 
                            fontSize: '1rem', // Tăng kích thước font chữ
                            padding: '16px' // Tăng padding để làm cho Alert to hơn
                        }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}
