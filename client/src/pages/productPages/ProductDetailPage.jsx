'use client'

import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { addToCartApi, fetchDataProductDetailApi, removeToCartApi } from './service'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '~/libs/features/cart/cartSlice'

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
	const user = useSelector(state => state.user.value)
	const carts = useSelector(state => state.cart.value)

	const { productId } = useParams()
	const [product, setProduct] = useState()
	const [existsCart, setExistsCart] = useState(false)
	const [isFavorite, setIsFavorite] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleFavoriteClick = () => {
		setIsFavorite((prev) => !prev)
		setSnackbarMessage(!isFavorite ? "Added to favorites" : "Removed from favorites")
		setSnackbarOpen(true)
	}

	const addToCart = async () => {
		if (user.exist) {
			const res = await addToCartApi(productId)
			if (res.success) {
				dispatch(setCart(res.carts))
				setExistsCart(true)
			}
		} else {
			navigate('/auth/login')
		}
	}

	const removeToCart = async () => {
		if (user.exist) {
			const res = await removeToCartApi(productId)
			if (res.success) {
				dispatch(setCart(res.carts))
				setExistsCart(false)
			}
		} else {
			
		}
	}

	const handleFetchDataProductDetail = async () => {
		const res = await fetchDataProductDetailApi(productId)
		if (res.success) {
			setProduct(res.product)
			setExistsCart(res.existsCart)
		} else {
			navigate('/product')
		}
	}

	useEffect(() => {
		handleFetchDataProductDetail()
	}, [productId, carts])

	return (
		<>
			{product && (
				<Container maxWidth="lg" sx={{ mt: 4, paddingBottom: 4 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={7}>
							<Box sx={{
								width: '100%',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<img src={`${import.meta.env.VITE_BACKEND_URL}/storage/` + product.image}
									alt={product.name}
									width={'100%'} />
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
							<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
								{!existsCart && (
									<Button variant="contained" startIcon={<ShoppingCart />} onClick={() => addToCart()}>
										Add to Cart
									</Button>
								)}
								{existsCart && (
									<Button variant="contained" startIcon={<ShoppingCart />} onClick={() => removeToCart()}>
										Remove to Cart
									</Button>
								)}
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
			)}
		</>
	)
}
