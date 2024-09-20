"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  IconButton,
  Snackbar,
  AppBar,
  Toolbar,
  Badge,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ArrowBack,
  Delete,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCartApi,
  fetchDataProductDetailApi,
  removeToCartApi,
} from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "~/libs/features/cart/cartSlice";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    comment: "Amazing quality and fast delivery!",
    time: "2023-09-19 10:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Great product, but the packaging could be better.",
    time: "2023-09-18 2:15 PM",
  },
  {
    id: 3,
    name: "Michael Brown",
    comment: "Highly recommend! Will buy again.",
    time: "2023-09-17 8:45 AM",
  },
  {
    id: 4,
    name: "Alice Johnson",
    comment: "Beautiful design and very comfortable!",
    time: "2023-09-16 4:30 PM",
  },
  {
    id: 5,
    name: "Bob Davis",
    comment: "Excellent customer service and product quality.",
    time: "2023-09-15 6:20 PM",
  },
  {
    id: 6,
    name: "Emily White",
    comment: "A bit pricey, but totally worth it.",
    time: "2023-09-14 9:50 AM",
  },
];

const ProductImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const ThumbnailImage = styled("img")({
  width: 80,
  height: 80,
  objectFit: "cover",
  cursor: "pointer",
  margin: "0 5px",
  border: "2px solid transparent",
  "&.active": {
    border: "2px solid #1976d2",
  },
});

// Dữ liệu sản phẩm mẫu (mockProduct)
const mockProduct = {
  id: 1,
  name: "Elegant Wooden Armchair",
  price: 299.99,
  category: "Furniture",
  description:
    "Elevate your living space with this beautifully crafted wooden armchair. Its elegant design and comfortable seating make it the perfect addition to any room.",
  rating: 4.5,
  reviewCount: 45,
  images: [
    "./Gallery/Berlinwall-01.jpg?height=600&width=600",
    "./Gallery/Berlinwall-01.jpg?height=600&width=600",
    "./Gallery/Berlinwall-01.jpg?height=600&width=600",
    "./Gallery/Berlinwall-01.jpg?height=600&width=600",
  ],
  specifications: [
    "Material: Solid oak wood",
    'Dimensions: 27"W x 30"D x 35"H',
    "Seat Height: 18 inches",
    "Weight Capacity: 300 lbs",
    "Upholstery: 100% polyester fabric",
    "Assembly Required: Yes",
  ],
};

export default function ProductDetail() {
  const user = useSelector((state) => state.user.value);
  const carts = useSelector((state) => state.cart.value);

  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [existsCart, setExistsCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(reviews);
  const [visibleComments, setVisibleComments] = useState(3);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newReview = {
        id: comments.length + 1,
        name: "New User", // Thông tin người dùng có thể được lấy từ authentication context
        comment: newComment,
        time: new Date().toLocaleString(), // Lấy thời gian hiện tại
      };
      setComments([newReview, ...comments]); // Thêm bình luận mới vào đầu danh sách
      setNewComment(""); // Reset ô nhập liệu
    }
  };

  const handleShowMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3); // Tăng số bình luận hiển thị thêm 3
  };

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
    setSnackbarMessage(
      !isFavorite ? "Added to favorites" : "Removed from favorites"
    );
    setSnackbarOpen(true);
  };

  const addToCart = async () => {
    if (user.exist) {
      const res = await addToCartApi(productId);
      if (res.success) {
        dispatch(setCart(res.carts));
        setExistsCart(true);
      }
    } else {
      navigate("/auth/login");
    }
  };

  const removeToCart = async () => {
    if (user.exist) {
      const res = await removeToCartApi(productId);
      if (res.success) {
        dispatch(setCart(res.carts));
        setExistsCart(false);
      }
    } else {
    }
  };

  const handleFetchDataProductDetail = async () => {
    const res = await fetchDataProductDetailApi(productId);
    if (res.success) {
      setProduct(res.product);
      setExistsCart(res.existsCart);
    } else {
      navigate("/product");
    }
  };

  useEffect(() => {
    handleFetchDataProductDetail();
  }, [productId, carts]);

  return (
    <>
      {product && (
        <Container maxWidth="lg" sx={{ mt: 4, paddingBottom: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden", // Đảm bảo hình không bị tràn khi phóng to
                  "& img": {
                    transition: "transform 0.5s ease",
                    width: "100%",
                    height: "auto",
                  },
                  "&:hover img": {
                    transform: "scale(1.2)", // Phóng to ảnh khi di chuột
                    filter: "brightness(85%)",
                  },
                }}
              >
                <img
                  src={
                    `${import.meta.env.VITE_BACKEND_URL}/storage/` +
                    product.image
                  }
                  alt={product.name}
                  width={"100%"}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                {!existsCart && (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </Button>
                )}
                {existsCart && (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => removeToCart()}
                  >
                    Remove to Cart
                  </Button>
                )}
                <IconButton
                  onClick={handleFavoriteClick}
                  color={isFavorite ? "secondary" : "default"}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <List>
                {mockProduct.specifications.map((spec, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={spec} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {/* Customer Reviews Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom>
              Customer Reviews
            </Typography>

            {/* Ô nhập liệu cho comment mới */}
            <Card
              sx={{ mb: 0, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Leave a Comment
              </Typography>
              <TextField
                label="Your comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Submit
              </Button>
            </Card>

            {/* Hiển thị danh sách bình luận */}
            <List>
              {comments.slice(0, visibleComments).map((review) => (
                <ListItem key={review.id} sx={{ mb: 0 }}>
                  <Card
                    sx={{
                      width: "100%",
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2} sm={1}>
                        <ListItemAvatar>
                          <Avatar>{review.name[0]}</Avatar>
                        </ListItemAvatar>
                      </Grid>
                      <Grid item xs={10} sm={11}>
                        <ListItemText
                          primary={
                            <>
                              <Typography variant="h6" component="span">
                                {review.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                {review.time}
                              </Typography>
                            </>
                          }
                          secondary={
                            <Typography
                              variant="body1"
                              color="text.primary"
                              sx={{ mt: 1 }}
                            >
                              {review.comment}
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </ListItem>
              ))}
            </List>

            {/* Nút Xem thêm bình luận */}
            {visibleComments < comments.length && (
              <Box sx={{ textAlign: "center", mt: 0 }}>
                <Button variant="contained" onClick={handleShowMoreComments}>
                  Xem thêm bình luận
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      )}
    </>
  );
}
