import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductDetailApi,
  updateProductApi,
  getCategoriesApi,
} from "./service";
import { useDispatch } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function ProductDetail() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Sử dụng category thay vì category_id
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductDetailApi(productId);
        if (res && res.data) {
          const { name, price, quantity, description, category, image } =
            res.data;
          setProduct(res.data);
          setName(name || "");
          setPrice(price || "");
          setQuantity(quantity || "");
          setDescription(description || "");
          setCategory(category?.id || ""); // Đảm bảo category có id
          setImage(image || ""); // Lưu đường dẫn hình ảnh cũ
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBrandsAndCategories = async () => {
      try {
        const [categoriesRes] = await Promise.all([getCategoriesApi()]);
        setCategories(categoriesRes.categories || []);
      } catch (err) {
        setError("Failed to fetch brands or categories.");
      }
    };

    fetchProduct();
    fetchBrandsAndCategories();
  }, [productId]);

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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("category_id", category);

    if (image) {
      formData.append("image", image);
    }

    // Log formData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const res = await updateProductApi(productId, formData);
      if (res.success) {
        setSuccess(true);
        dispatch(setPopup({ type: "success", message: res.message }));
        navigate("/supplier/products");
      } else {
        setError(res.message);
        dispatch(setPopup({ type: "error", message: res.message }));
      }
    } catch (err) {
      console.error("Error details:", err.response.data); // Log lỗi chi tiết
      setError("Failed to update product.");
      dispatch(
        setPopup({ type: "error", message: "Failed to update product." })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Cập nhật giá trị mặc định nếu giá trị hiện tại không có trong danh sách
  const categoryValue = categories.some((cat) => cat.id === category)
    ? category
    : "";

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("ProductDetail")}
        </title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          userSelect: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>{t("ProductDetail")}</Box>
          <Button onClick={() => navigate("/management/products")}>
            {t("View all products")}
          </Button>
        </Box>

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && product && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {success && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {t("Product updated successfully!")}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}

            {/* Hiển thị hình ảnh cũ nếu có */}
            {product.image && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={product.image} // Sử dụng đường dẫn hình ảnh từ API
                  alt="Product"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={t("Product Name")}
              variant="standard"
            />
            <TextField
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label={t("Price")}
              variant="standard"
            />
            <TextField
              fullWidth
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label={t("Quantity")}
              variant="standard"
            />
            <TextField
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label={t("Description")}
              variant="standard"
            />
            <FormControl fullWidth variant="standard">
              <InputLabel>{t("Category")}</InputLabel>
              <Select
                value={categoryValue}
                onChange={(e) => setCategory(e.target.value)}
                label={t("Category")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              inputProps={{ accept: "image/*" }}
              fullWidth
              margin="none"
              sx={{ marginTop: 2 }}
            />
            <Box sx={{ width: "100%", padding: "5px 0px", gap: "10px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
              >
                {t("Save")}
              </Button>
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
