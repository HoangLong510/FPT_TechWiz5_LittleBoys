import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchDataCategoriesApi, fetchDataProductsApi } from "./service";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function PageShop() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const carts = useSelector((state) => state.cart.value);

  const navigate = useNavigate();

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFetchDataProducts = async () => {
    setLoading(true);
    const data = {
      search: searchTerm,
      sort: sort,
      filterCategory: filterCategory,
    };

    const res = await fetchDataProductsApi(data);

    if (res.success) {
      setProducts(res.products);
    }
    setLoading(false);
  };

  const handleFetchDataCategories = async () => {
    const res = await fetchDataCategoriesApi();
    if (res.success) {
      setCategories(res.categories);
    }
  };

  useEffect(() => {
    handleFetchDataCategories();
  }, []);

  useEffect(() => {
    handleFetchDataProducts();
  }, [searchTerm, sort, filterCategory]);

  return (
    <>
    <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "50vh",
          backgroundImage: "url('/video/blog-df.png')",
        }}
      >
        <video
          className="video-background"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/video/video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          className="video-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Products  
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Discover all our exquisite furniture products, where you will find the perfect products for every living space
            </Typography>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sort}
                label="Sort by"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="">-- latest --</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
                <MenuItem value="asc">Price: Low to High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">---- All ----</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ paddingBottom: "40px" }}>
          {!loading &&
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  whileHover={{ scale: 1.05 }} // Phóng to nhẹ khi hover
                  whileTap={{ scale: 0.95 }} // Thu nhỏ nhẹ khi nhấp chuột
                  transition={{ duration: 0.3 }} // Hiệu ứng mượt mà trong 0.3s
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      loading="lazy"
                      image={
                        `${import.meta.env.VITE_BACKEND_URL}/storage/` +
                        product.image
                      }
                      alt={product.name}
                      sx={{ cursor: "pointer" }}
                      onClick={() => goToProductDetail(product.id)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h7" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.category}
                      </Typography>
                      <Typography
                        variant="h7"
                        color="text.primary"
                        sx={{ mt: 2 }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}

          {loading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "200px",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
}
