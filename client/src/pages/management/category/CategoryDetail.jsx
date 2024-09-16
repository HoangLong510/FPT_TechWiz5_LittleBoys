import { Box, Button, CircularProgress, TextField, Alert, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategoryDetailApi, updateCategoryApi } from "./service";
import { useDispatch } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function CategoryDetail() {
    const { t } = useTranslation();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null); // Trạng thái lưu hình ảnh
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const res = await getCategoryDetailApi(categoryId);
                if (res && res.category) {
                    setCategory(res.category);
                    setName(res.category.name);
                    setImage(null); // Reset image state
                } else {
                    setError('Category not found.');
                }
            } catch (err) {
                setError('Failed to fetch category details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Tạo FormData để gửi cả tên và hình ảnh
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await updateCategoryApi(categoryId, formData); // Sử dụng formData khi gọi API
            if (res.success) {
                setSuccess(true);
                dispatch(setPopup({ type: 'success', message: res.message }));
                navigate('/management/categories'); // Chuyển hướng sau khi cập nhật thành công
            } else {
                setError(res.message);
                dispatch(setPopup({ type: 'error', message: res.message }));
            }
        } catch (err) {
            setError('Failed to update category.');
            dispatch(setPopup({ type: 'error', message: 'Failed to update category.' }));
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
                <title>{import.meta.env.VITE_PROJECT_NAME} | {t("CategoryDetail")}</title>
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
                        {t("CategoryDetail")}
                    </Box>
                    <Link to="/management/categories">
                        <Button>
                            {t("View all categories")}
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

                {!loading && category && (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        {success && (
                            <Alert severity="success" sx={{ marginBottom: 2 }}>
                                {t("Category updated successfully!")}
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Hiển thị hình ảnh cũ nếu có */}
                        {category.image && (
                            <Box sx={{ mb: 2 }}>
                                <img
                                    src={`/Images/${category.image}`} // Đảm bảo đường dẫn đúng với cấu trúc của bạn
                                    alt="Category"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={t("CategoryName")}
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

                        {/* Thêm thông tin về ngày tạo và cập nhật */}
                        <TextField
                            fullWidth
                            value={category?.created_at}
                            label={t("Created At")}
                            variant="standard"
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            fullWidth
                            value={category?.updated_at}
                            label={t("Updated At")}
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
