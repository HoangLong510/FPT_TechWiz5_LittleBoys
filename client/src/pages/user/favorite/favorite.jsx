import { Box, CircularProgress, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'
import { fetchFavoritesApi, removeFavoriteApi } from './service'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { setPopup } from '~/libs/features/popup/popupSlice'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function Favorite() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(0)

	const [favorites, setFavorites] = useState([])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleFetchFavorites = async () => {
		setLoading(true)

		const data = {
			page
		}

		const res = await fetchFavoritesApi(data)

		if (res.success) {
			await Promise.all([
				setFavorites(res.favorites),
				setTotalPage(res.totalPage)
			])
		}

		setLoading(false)
	}

	const handleRemoveFavorites = async (id) => {
		const res = await removeFavoriteApi(id)

		if (res.success) {
			handleFetchFavorites()
			const dataPopup = {
				type: "success",
				message: res.message
			}
			dispatch(setPopup(dataPopup))
		}
	}

	useEffect(() => {
		handleFetchFavorites()
	}, [page])

	return (
		<>
			<Helmet>
				<title>{import.meta.env.VITE_PROJECT_NAME} | {t("Favorite")}</title>
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
					<Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
						{t('Favorite')}
					</Box>
				</Box>

				<TableContainer component={Paper} sx={{ border: '1px solid #e6e6e6', boxShadow: 'none' }}>
					<Table sx={{ height: (loading || favorites.length === 0) ? "100%" : "" }}>
						<TableHead sx={{ height: '60px' }}>
							<TableRow sx={{ textTransform: 'uppercase', backgroundColor: 'primary.main' }}>
								<TableCell sx={{ color: '#fff', width: '30%' }}>
									Name
								</TableCell>
								<TableCell align="center" sx={{ color: '#fff', width: '30%', display: { xs: 'none', md: 'revert' } }}>
									Image
								</TableCell>
								<TableCell align="center" sx={{ color: '#fff', width: '30%', display: { xs: 'none', md: 'revert' } }}>
									Price
								</TableCell>
								<TableCell align="right" sx={{ color: '#fff', width: '10%' }}>
									Action
								</TableCell>

							</TableRow>
						</TableHead>
						<TableBody>
							{!loading && favorites.length > 0 && favorites.map((favorite) => (
								<TableRow
									key={favorite.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
										'&:hover': {
											backgroundColor: '#f5f5f5',
											cursor: 'pointer',
										}
									}}
								>
									<TableCell onClick={() => navigate(`/product/${favorite.product_id}`)}>
										{favorite.name}
									</TableCell>
									<TableCell onClick={() => navigate(`/product/${favorite.product_id}`)} align="center" sx={{
										textTransform: 'capitalize',
										display: { xs: 'none', md: 'revert' }
									}}>
										<img src={`${import.meta.env.VITE_BACKEND_URL}/storage/` + favorite.image}
											alt={favorite.name}
											width={'80px'} />
									</TableCell>
									<TableCell align="center" onClick={() => navigate(`/product/${favorite.product_id}`)} sx={{
										display: { xs: 'none', md: 'revert' }
									}}>
										${favorite.price}
									</TableCell>
									<TableCell align="right" style={{ textTransform: 'capitalize' }}>
										<IconButton onClick={() => handleRemoveFavorites(favorite.id)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
							{!loading && favorites.length === 0 && (
								<TableRow>
									<TableCell colSpan={5} align="center">
										{t("NoData")}
									</TableCell>
								</TableRow>
							)}
							{loading && (
								<TableRow>
									<TableCell colSpan={5} align="center">
										<CircularProgress />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
					<Stack spacing={2}>
						<Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary" />
					</Stack>
				</Box>
			</Box>
		</>
	)
}
