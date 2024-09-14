import { Box, Button, CircularProgress, TextField, Alert } from "@mui/material";
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchBrand = async () => {
            setLoading(true);
            try {
                const res = await getBrandDetailApi(brandId);
                console.log('Brand detail response:', res); // Debugging log
                if (res && res.brand) {
                    setBrand(res.brand);
                    setName(res.brand.name);
                } else {
                    setError('Brand not found.');
                }
            } catch (err) {
                console.error('Error fetching brand detail:', err); // Debugging log
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

        try {
            const res = await updateBrandApi({ id: brandId, name });
            console.log('Update brand response:', res); // Debugging log
            if (res.success) {
                setBrand({ ...brand, name });
                setSuccess(true);
                dispatch(setPopup({ type: 'success', message: res.message }));
            } else {
                setError(res.message);
                dispatch(setPopup({ type: 'error', message: res.message }));
            }
        } catch (err) {
            console.error('Error updating brand:', err); // Debugging log
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
                        Brand Detail
                    </Box>
                    <Link to="/management/brands">
                        <Button>
                            View all brands
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
                                Brand updated successfully!
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Brand Name"
                            variant="standard"
                        />

                        <TextField
                            fullWidth
                            value={brand?.created_at}
                            label="Created At"
                            variant="standard"
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            fullWidth
                            value={brand?.updated_at}
                            label="Updated At"
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
                                Save
                            </Button>
                        </Box>

                        <Box sx={{ width: '100%', padding: '5px 0px', gap: '10px' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}
