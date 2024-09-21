import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Input,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCategoriesApi, createProductApi } from "./service";
import { useSelector } from "react-redux";

export default function ProductCreate() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    async function fetchData() {
      try {
        const { categories } = await getCategoriesApi();
        setCategories(categories || []);
      } catch (err) {
        setSnackbarMessage("Failed to fetch categories.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
    fetchData();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setOpenSnackbar(false);

    if (!name || !price || !quantity || !categoryId) {
      setSnackbarMessage("All fields and user ID are required.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const { success, message } = await createProductApi(formData);
      if (success) {
        setSnackbarMessage(t("Product created successfully!"));
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/supplier/products"), 500);
      } else {
        setSnackbarMessage(message[i18n.language] || "Failed to create product.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error("Error creating product:", err);
      setSnackbarMessage("Failed to create product. Please try again later.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/supplier/products");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("CreateProduct")}
        </title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>{t("CreateProduct")}</Box>
          <Button onClick={handleBack}>{t("Back to List")}</Button>
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

        {!loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={t("Product Name")}
              variant="standard"
              required
            />
            <TextField
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label={t("Price")}
              variant="standard"
              type="number"
              required
            />
            <TextField
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label={t("Quantity")}
              variant="standard"
              type="number"
              required
            />
            <TextField
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label={t("Description")}
              variant="standard"
              multiline
            />
            <FormControl
              fullWidth
              variant="standard"
              required
              sx={{ marginTop: 2 }}
            >
              <InputLabel>{t("Category")}</InputLabel>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label={t("Category")}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Trường ẩn cho brand_id (supplier_id) */}
            <input type="hidden" value={user.data.id} />

            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              inputProps={{ accept: "image/*" }}
              fullWidth
              sx={{ marginTop: 2 }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
            >
              <Button
                sx={{ width: "160px" }}
                variant="contained"
                color="primary"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : t("Create")}
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
            "& .MuiSnackbarContent-root": { width: "auto", maxWidth: "600px" },
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%", fontSize: "1rem", padding: "16px" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
