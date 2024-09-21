import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Oders() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(true)

	const [orders, setOrders] = useState([])

	return (
		<>
			<Helmet>
				<title>{import.meta.env.VITE_PROJECT_NAME} | My Order</title>
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
						My Order
					</Box>
				</Box>

				<TableContainer component={Paper} sx={{ border: '1px solid #e6e6e6', boxShadow: 'none' }}>
					<Table sx={{ height: (loading || orders.length === 0) ? "100%" : "" }}>
						<TableHead sx={{ height: '60px' }}>
							<TableRow sx={{ textTransform: 'uppercase', backgroundColor: 'primary.main' }}>
								<TableCell sx={{ color: '#fff', width: '20%' }}>
									Oder id
								</TableCell>
								<TableCell align="center" sx={{ color: '#fff', width: '40%', display: { xs: 'none', md: 'revert' } }}>
									{t("CreatedAt")}
								</TableCell>
								<TableCell align="center" sx={{ color: '#fff', width: '20%', display: { xs: 'none', md: 'revert' } }}>
									Total price
								</TableCell>
								<TableCell align="right" sx={{ color: '#fff', width: '20%' }}>
									Type
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{!loading && orders.length > 0 && orders.map((order) => (
								<TableRow onClick={() => navigate(`/user/${order.id}`)}
									key={order.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0, borderBottom: '1px solid #e6e6e6' },
										'&:hover': {
											backgroundColor: '#f5f5f5',
											cursor: 'pointer',
										}
									}}
								>
									<TableCell>
										{order.id}
									</TableCell>
									<TableCell align="center" sx={{
										display: { xs: 'none', md: 'revert' }
									}}>
										${order.created_at}
									</TableCell>
									<TableCell align="center" sx={{
										display: { xs: 'none', md: 'revert' }
									}}>
										${order.total_price}
									</TableCell>
									<TableCell align="right" style={{ textTransform: 'capitalize' }}>
										{order.type}
									</TableCell>
								</TableRow>
							))}
							{!loading && orders.length === 0 && (
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
			</Box>
		</>
	)
}
