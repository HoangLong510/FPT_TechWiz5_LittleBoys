import React, { useEffect, useState } from "react";
import {
	Container,
	Grid,
	Typography,
	Button,
	Box,
	Card,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	ListItemAvatar,
	Avatar,
} from "@mui/material";
import {
	Favorite,
	FavoriteBorder,
	Share,
	ShoppingCart,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	addToCartApi,
	commentApi,
	fetchCommentsApi,
	fetchDataProductDetailApi,
	removeCommentApi,
	removeToCartApi,
	toggleFavoriteApi,
} from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "~/libs/features/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { setPopup } from "~/libs/features/popup/popupSlice";
import { formatDate } from "~/function";
import DeleteIcon from '@mui/icons-material/Delete'

export default function ProductDetail() {
	const user = useSelector((state) => state.user.value);
	const carts = useSelector((state) => state.cart.value);

	const { productId } = useParams();
	const [product, setProduct] = useState();
	const [existsCart, setExistsCart] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation()

	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);

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
		}
	};

	const handleFetchDataProductDetail = async () => {
		const res = await fetchDataProductDetailApi(productId);
		if (res.success) {
			setProduct(res.product);
			setExistsCart(res.existsCart);
			setIsFavorite(res.existsFavorite);
		} else {
			navigate("/product");
		}
	};

	const handleAddNewComment = async (e) => {
		e.preventDefault();

		const data = {
			productId,
			content: newComment,
		};

		const res = await commentApi(data)

		if (res.success) {
			setNewComment("")
			const dataPopup = {
				type: "success",
				message: res.message
			}
			dispatch(setPopup(dataPopup))
			setComments(res.comments)
		} else {
			const dataPopup = {
				type: "error",
				message: res.message
			}
			dispatch(setPopup(dataPopup))
		}
	}

	const fetchComments = async () => {
		const res = await fetchCommentsApi(productId)
		if (res.success) {
			setComments(res.comments)
		}
	}

	const handleRemoveComment = async (id) => {
		const data = {
			id,
			productId,
		}

		const res = await removeCommentApi(data)

		if (res.success) {
			const dataPopup = {
				type: "success",
				message: res.message
			}
			dispatch(setPopup(dataPopup))
			setComments(res.comments)
		}
	}

	const handleToggleFavorite = async () => {
		if (user.exist) {
			const res = await toggleFavoriteApi(productId)
			if (res.success) {
				if (isFavorite) {
					setIsFavorite(false)
				} else {
					setIsFavorite(true)
				}
			}
		} else {
			navigate("/auth/login");
		}
	}

	useEffect(() => {
		handleFetchDataProductDetail();
		fetchComments()
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
									onClick={() => handleToggleFavorite()}
									color={isFavorite ? "error" : "default"}
								>
									{isFavorite ? <Favorite /> : <FavoriteBorder />}
								</IconButton>
							</Box>
							<Typography variant="h6" gutterBottom>
								Specifications
							</Typography>
							<List>
								<ListItem>
									<ListItemText
									primary={'Category:'}
									secondary={'- ' + product.category.name}
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>

					{/* Customer Reviews Section */}
					<Box sx={{ mt: 6 }}>

						{/* Ô nhập liệu cho comment mới */}
						<Card
							sx={{ mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
						>
							<Typography variant="h6" gutterBottom>
								Leave a Comment
							</Typography>
							{user.exist && (
								<form onSubmit={handleAddNewComment}>
									<TextField
										label="Your comment"
										variant="outlined"
										fullWidth
										rows={4}
										value={newComment}
										onChange={(e) => setNewComment(e.target.value)}
										sx={{ mb: 2 }}
									/>
									<Button
										variant="contained"
										color="primary"
										type="submit"
									>
										Submit
									</Button>
								</form>
							)}

							{!user.exist && (
								<Box sx={{
									width: '100%',
									mt: '20px'
								}}>
									<Link to='/auth/login'>
										<Button variant="contained" color="primary" fullWidth>
											{t("Login")}
										</Button>
									</Link>
								</Box>
							)}
						</Card>

						{/* Hiển thị danh sách bình luận */}
						{comments.map((comment) => (
							<Card key={comment.id}
								sx={{
									width: "100%",
									p: 2,
									borderRadius: 2,
									mb: 3,
									border: "1px solid #ddd",
								}}
							>
								<Grid container spacing={2}>
									<Grid item xs={2} sm={1}>
										<ListItemAvatar>
											<Avatar>{comment.fullname[0]}</Avatar>
										</ListItemAvatar>
									</Grid>
									{(comment.user_id == user.data.id || user.data.role === 'admin') ? (
										<>
											<Grid item xs={8} sm={10}>
												<ListItemText
													primary={
														<>
															<Typography variant="h6" component="span">
																{comment.fullname}
															</Typography>
															<Typography
																variant="body2"
																color="text.secondary"
															>
																{formatDate(comment.created_at)}
															</Typography>
														</>
													}
													secondary={
														<Typography
															variant="body1"
															color="text.primary"
															sx={{ mt: 1 }}
														>
															{comment.content}
														</Typography>
													}
												/>
											</Grid>
											<Grid item xs={2} sm={1}>
												<Box sx={{
													width: '100%',
													display: 'flex',
													justifyContent: 'flex-end',
													alignItems: 'center',
													height: '100%'
												}}>
													<a className="button"
														variant="outlined"
														onClick={() => handleRemoveComment(comment.id)}
													>
														<DeleteIcon />
													</a>
												</Box>
											</Grid>
										</>
									) : (
										<>
											<Grid item xs={10} sm={11}>
												<ListItemText
													primary={
														<>
															<Typography variant="h6" component="span">
																{comment.fullname}
															</Typography>
															<Typography
																variant="body2"
																color="text.secondary"
															>
																{formatDate(comment.created_at)}
															</Typography>
														</>
													}
													secondary={
														<Typography
															variant="body1"
															color="text.primary"
															sx={{ mt: 1 }}
														>
															{comment.content}
														</Typography>
													}
												/>
											</Grid>
										</>
									)}
								</Grid>
							</Card>
						))}
					</Box>
				</Container>
			)}
		</>
	);
}
