import { Box, Button, CircularProgress, TextField, Alert, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBrandDetailApi, updateBrandApi } from "./service";
import { useDispatch } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function BrandDetail() {
    const { t } = useTranslation();
    const { brandId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [brand, setBrand] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null); // Trạng thái lưu hình ảnh
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchBrand = async () => {
            setLoading(true);
            try {
                const res = await getBrandDetailApi(brandId);
                if (res && res.brand) {
                    setBrand(res.brand);
                    setName(res.brand.name);
                    setImage(null); // Reset image state
                } else {
                    setError('Brand not found.');
                }
            } catch (err) {
                setError('Failed to fetch brand details.');
            } finally {
                setLoading(false);
            }
        };

        fetchBrand();
    }, [brandId]);

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

        if (image && image.size > MAX_FILE_SIZE) {
            setError("The image size must not exceed 2 MB.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await updateBrandApi(brandId, formData); // Sử dụng formData khi gọi API
            if (res.success) {
                setBrand({ ...brand, name });
                setSuccess(true);
                dispatch(setPopup({ type: 'success', message: res.message }));
                navigate('/management/brands'); // Chuyển hướng sau khi cập nhật thành công
            } else {
                setError(res.message);
                dispatch(setPopup({ type: 'error', message: res.message }));
            }
        } catch (err) {
            setError('Failed to update brand.');
            dispatch(setPopup({ type: 'error', message: 'Failed to update brand.' }));
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("BrandDetail")}</title>
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
                        {t("BrandDetail")}
                    </Box>
                    <Link to="/management/brands">
                        <Button>
                            {t("View all brands")}
                        </Button>
                    </Link>
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

                {!loading && brand && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        {success && (
                            <Alert severity="success" sx={{ marginBottom: 2 }}>
                                {t("Brand updated successfully!")}
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {brand.image && (
                            <Box sx={{ mb: 2 }}>
                                <img
                                    src={brand.image}
                                    alt="Brand"
                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={t("BrandName")}
                            variant="standard"
                        />

                        <Input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            inputProps={{ accept: 'image/*' }}
                            fullWidth
                            margin="none"
                            sx={{ marginTop: 2 }}
                        />

                        <TextField
                            fullWidth
                            value={brand?.created_at}
                            label={t("CreatedAt")}
                            variant="standard"
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            fullWidth
                            value={brand?.updated_at}
                            label={t("UpdatedAt")}
                            variant="standard"
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {t("Save")}
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
            </Box>
        </>
    );
}
