'use client'

import React, { useState } from 'react'
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
} from '@mui/material'
import {
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ArrowBack,
  Delete,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
})

const ThumbnailImage = styled('img')({
  width: 80,
  height: 80,
  objectFit: 'cover',
  cursor: 'pointer',
  margin: '0 5px',
  border: '2px solid transparent',
  '&.active': {
    border: '2px solid #1976d2',
  },
})

// Dữ liệu sản phẩm mẫu (mockProduct)
const mockProduct = {
  id: 1,
  name: "Elegant Wooden Armchair",
  price: 299.99,
  category: "Furniture",
  description: "Elevate your living space with this beautifully crafted wooden armchair. Its elegant design and comfortable seating make it the perfect addition to any room.",
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
    "Dimensions: 27\"W x 30\"D x 35\"H",
    "Seat Height: 18 inches",
    "Weight Capacity: 300 lbs",
    "Upholstery: 100% polyester fabric",
    "Assembly Required: Yes",
  ],
}

export default function ProductDetail() {
  const [mainImage, setMainImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)
  const [cart, setCart] = useState([])

  const handleThumbnailClick = (index) => {
    setMainImage(index)
  }

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev)
    setSnackbarMessage(!isFavorite ? "Added to favorites" : "Removed from favorites")
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handlePrevImage = () => {
    setMainImage((prev) => (prev === 0 ? mockProduct.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setMainImage((prev) => (prev === mockProduct.images.length - 1 ? 0 : prev + 1))
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id, newQuantity) => {
    // Ensure the new quantity is a positive integer
    if (newQuantity > 0) {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/product')} aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProductDetail
          </Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ position: 'relative' }}>
              <ProductImage src={mockProduct.images[mainImage]} alt="Product" />
              <IconButton
                sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
                onClick={handlePrevImage}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                onClick={handleNextImage}
              >
                <ChevronRight />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {mockProduct.images.map((img, index) => (
                <ThumbnailImage
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={index === mainImage ? 'active' : ''}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" gutterBottom>
              {mockProduct.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${mockProduct.price.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={mockProduct.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({mockProduct.reviewCount} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {mockProduct.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip label="In Stock" color="success" sx={{ mr: 1 }} />
              <Chip label="Free Shipping" color="primary" />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button variant="contained" startIcon={<ShoppingCart />} onClick={() => addToCart(mockProduct)}>
                Add to Cart
              </Button>
              <IconButton onClick={handleFavoriteClick} color={isFavorite ? 'secondary' : 'default'}>
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
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            You May Also Like
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/placeholder.svg?height=200&width=200`}
                    alt={`Related Product ${item}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Related Product {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Brief description of the related product.
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      $199.99
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}`}
                />
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  sx={{ width: 60, mr: 1 }}
                />
                <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setIsCheckout(true)
              setIsCartOpen(false)
            }}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Drawer>

      <Dialog open={isCheckout} onClose={() => setIsCheckout(false)}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="card"
            label="Credit Card Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Typography variant="body1" gutterBottom>
            Total Amount: ${total.toFixed(2)}
          </Typography>
          {/* Add more checkout details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckout(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => alert('Order placed successfully!')}>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  )
}
