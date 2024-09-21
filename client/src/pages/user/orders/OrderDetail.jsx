import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
    Box,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Chip,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material'
import {
    Person,
    Email,
    Phone,
    Home,
    LocalShipping
} from '@mui/icons-material'
import { fetchOrderDetailApi } from './service'
import { formatDate } from '~/function'

export default function OrderDetail() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleFetchOrderDetail = async () => {
        setLoading(true)
        try {
            const res = await fetchOrderDetailApi(id)
            if (res.success) {
                setOrder(res.order)
            }
        } catch (error) {
            console.error("Failed to fetch order details:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchOrderDetail()
    }, [id])

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning'
            case 'canceled': return 'error'
            case 'success': return 'success'
            default: return 'default'
        }
    }

    return (
        <>
            <Helmet>
                <title>{import.meta.env.VITE_PROJECT_NAME} | Order Detail</title>
            </Helmet>
            <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={400} />
                ) : order ? (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Person sx={{ mr: 2 }} /> Customer Information
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Person sx={{ mr: 2, color: 'text.secondary' }} /> {order.fullname}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Email sx={{ mr: 2, color: 'text.secondary' }} /> {order.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Phone sx={{ mr: 2, color: 'text.secondary' }} /> {order.phone}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Home sx={{ mr: 2, color: 'text.secondary' }} /> {order.address}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalShipping sx={{ mr: 1 }} /> Order Summary
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">Order ID</Typography>
                                            <Typography variant="body1">{order.id}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">Order Date</Typography>
                                            <Typography variant="body1">{formatDate(order.created_at)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">Status</Typography>
                                            <Chip sx={{ userSelect: 'none' }}
                                                label={order.type}
                                                color={getStatusColor(order.type)}
                                                size="small" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                                            <Typography variant="h6" color="primary">${order.total_price}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 8 }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            {!isMobile && <TableCell align="right">Unit Price</TableCell>}
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.details.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell component="th" scope="row">
                                                    {item.name}
                                                    {isMobile && (
                                                        <Typography variant="body2" color="text.secondary">
                                                            ${item.price}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                {!isMobile && <TableCell align="right">${item.price}</TableCell>}
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">${item.quantity * item.price}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={isMobile ? 2 : 3} align="right" sx={{ fontWeight: 'bold' }}>Total Amount:</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>${order.total_price}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">No order found</Typography>
                )}
            </Box>
        </>
    )
}