import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Rating,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sort,
  FilterList,
  Facebook,
  Instagram,
  LinkedIn,
  Email,
} from "@mui/icons-material";

// Mock data for the supplier
const supplierData = {
  name: "ABC Furniture Supplier",
  logo: "/Images/bg/bg1.png?height=100&width=100",
  rating: 4.5,
  description:
    "Leading supplier of high-quality furniture for homes and offices.",
  contact: {
    email: "contact@abcfurniture.com",
    phone: "+1 (123) 456-7890",
    address: "123 Furniture St, Design City, DC 12345",
  },
  socialMedia: {
    facebook: "https://facebook.com/abcfurniture",
    instagram: "https://instagram.com/abcfurniture",
    linkedin: "https://linkedin.com/company/abcfurniture",
  },
};

// Mock data for portfolio items
const portfolioItems = [
  {
    id: 1,
    name: "Modern Office Desk",
    category: "Office",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description:
      "Sleek and functional office desk suitable for modern workspaces.",
  },
  {
    id: 2,
    name: "Cozy Living Room Set",
    category: "Living Room",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description: "Comfortable and stylish living room furniture set.",
  },
  {
    id: 3,
    name: "Minimalist Bedroom Suite",
    category: "Bedroom",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description: "Clean and minimalist bedroom furniture collection.",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Office",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description: "High-quality ergonomic office chair for maximum comfort.",
  },
  {
    id: 5,
    name: "Rustic Dining Table",
    category: "Dining Room",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description: "Beautiful rustic dining table perfect for family gatherings.",
  },
  {
    id: 6,
    name: "Contemporary Bookshelf",
    category: "Living Room",
    image: "/Images/bg/bg1.png?height=200&width=300",
    description: "Modern bookshelf with ample storage space.",
  },
];

// Mock data for customer reviews
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

const categories = ["All", "Office", "Living Room", "Bedroom", "Dining Room"];
const sortOptions = ["Name", "Category"];

export default function SupplierDetail() {
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Name");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(reviews);
  const [visibleComments, setVisibleComments] = useState(3);

  useEffect(() => {
    let result = portfolioItems;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "Name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "Category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    setFilteredItems(result);
  }, [searchTerm, selectedCategory, sortBy]);

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={supplierData.logo}
                  alt={supplierData.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {supplierData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {supplierData.description}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Contact Information:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary={supplierData.contact.email}
                        secondary="Email"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={supplierData.contact.phone}
                        secondary="Phone"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={supplierData.contact.address}
                        secondary="Address"
                      />
                    </ListItem>
                  </List>
                  {/* Redesigned Social Media Buttons */}
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <IconButton
                      component="a"
                      href={supplierData.socialMedia.facebook}
                      target="_blank"
                      color="primary"
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={supplierData.socialMedia.instagram}
                      target="_blank"
                      color="primary"
                    >
                      <Instagram />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={supplierData.socialMedia.linkedin}
                      target="_blank"
                      color="primary"
                    >
                      <LinkedIn />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Portfolio
            </Typography>
            
            <Box
              sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
            </Box>
            <AnimatePresence>
              <Grid container spacing={2}>
                {filteredItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{ mt: 1, mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </AnimatePresence>
          </Grid>
        </Grid>
        {/* Customer Reviews Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Customer Reviews
          </Typography>

          {/* Ô nhập liệu cho comment mới */}
          <Card sx={{ mb: 0, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
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
            <Box sx={{ textAlign: "center", mt: 0}}>
              <Button variant="contained" onClick={handleShowMoreComments}>
                Xem thêm bình luận
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
