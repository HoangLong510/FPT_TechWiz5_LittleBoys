import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Badge,
} from '@mui/material'
import { ShoppingCart, Delete } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

// Mock product data with images
const initialProducts = [
  { id: 1,
    name: "Elegant Wooden Armchair",
    price: 299.99,
    category: "Furniture",
    image: "./Gallery/Berlinwall-01.jpg?height=200&width=200" },
   
  { id: 2, name: "Modern Coffee Table", price: 149.99, category: "Furniture", image: "./Gallery/Berlinwall-02.jpg?height=200&width=200" },
  { id: 3, name: "Cozy Sofa Set", price: 899.99, category: "Furniture", image: "./Gallery/Berlinwall-03.jpg?height=200&width=200" },
  { id: 4, name: "Minimalist Bookshelf", price: 199.99, category: "Furniture", image: "./Gallery/Eiffel-02.jpg?height=200&width=200" },
  { id: 5, name: "Rustic Dining Table", price: 499.99, category: "Furniture", image: "./Gallery/Eiffel-02.jpg?height=200&width=200" },
  { id: 6, name: "Comfortable Bed Frame", price: 599.99, category: "Furniture", image: "./Gallery/Eiffel-02.jpg?height=200&width=200" },
  { id: 7, name: "Stylish Floor Lamp", price: 89.99, category: "Lighting", image: "./Gallery/Eiffel-02.jpg?height=200&width=200" },
  { id: 8, name: "Decorative Wall Mirror", price: 129.99, category: "Decor", image: "./Gallery/Colloseum-05.jpg?height=200&width=200" },
  { id: 9, name: "Plush Area Rug", price: 179.99, category: "Decor", image: "./Gallery/Eiffel-02.jpg?height=200&width=200" },
  { id: 10, name: "Accent Throw Pillows Set", price: 49.99, category: "Decor", image: "./Gallery/Eiffel-01.jpg?height=200&width=200" },
]

const theme = createTheme()

export default function PageShop() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('All')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let filteredProducts = initialProducts

    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCategory !== 'All') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filterCategory
      )
    }

    filteredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'priceLow') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })

    setProducts(filteredProducts)
  }, [searchTerm, sortBy, filterCategory])

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
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product
          </Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

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
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="priceLow">Price: High to Low</MenuItem>
                <MenuItem value="priceHigh">Price: Low to High</MenuItem>
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
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Lighting">Lighting</MenuItem>
                <MenuItem value="Decor">Decor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={product.image}
                  alt={product.name}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => goToProductDetail(product.id)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                  <Delete />
                </IconButton>
              }>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
                />
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 60, ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" align="right" sx={{ mt: 2 }}>
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
            sx={{ mt: 2 }}
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
          <Button onClick={() => {
            alert('Order placed successfully!')
            setCart([])
            setIsCheckout(false)
          }}>Place Order</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}