import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Paper from '@mui/material/Paper'

export default function Favorite() {
	const { t } = useTranslation()

	const [loading, setLoading] = useState(false)

	const [favorites, setFavorites] = useState([])

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
									Price
								</TableCell>
								<TableCell align="right" sx={{ color: '#fff', width: '10%' }}>
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>

						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}
