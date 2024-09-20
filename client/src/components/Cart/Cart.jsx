import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeToCartApi } from './service'
import { setCart } from '~/libs/features/cart/cartSlice'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, Button } from '@mui/material'
import FormUpdateQuantity from './FormUpdateQuantity'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const carts = useSelector(state => state.cart.value)

    const dispatch = useDispatch()

    const handleRemoveToCart = async (id) => {
        setLoading(true)
        const res = await removeToCartApi(id)
        if (res.success) {
            dispatch(setCart(res.carts))
        }
        setLoading(false)
    }

    const totalPrice = (data) => {
        const total = data.reduce((total, item) => total + (item.price * item.quantity), 0)
        return total.toFixed(2)
    }

    return (
        <>
            <Badge onClick={toggleDrawer(true)} badgeContent={carts.data.length} color="error">
                <ShoppingCartIcon />
            </Badge>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                <Box sx={{ width: '350px' }} role="presentation" onClick={toggleDrawer(false)}>
                    <Box sx={{ padding: '20px', fontSize: '20px', fontWeight: '500' }}>
                        Your Cart
                    </Box>
                </Box>

                {!loading && carts.exist && (
                    <List sx={{
                        padding: '0px 10px 10px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {carts.data.map(cart => (
                            <ListItem key={cart.id}>
                                <ListItemText
                                    primary={cart.name}
                                    secondary={`$${cart.price + " x " + cart.quantity}`}
                                    className='button'
                                    onClick={() => {
                                        navigate(`/product/${cart.product_id}`)
                                    }}
                                />

                                <FormUpdateQuantity qty={cart.quantity} id={cart.id} />

                                <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <a className='button' onClick={() => handleRemoveToCart(cart.id)}>
                                        <DeleteIcon color='action' />
                                    </a>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Box sx={{ padding: '20px', fontSize: '20px', fontWeight: '500', textAlign: 'right' }}>
                    Total: ${totalPrice(carts.data)}
                </Box>

                <Box sx={{ padding: '0px 20px' }}>
                    <Button fullWidth variant='contained'>
                        Proceed to checkout
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}
