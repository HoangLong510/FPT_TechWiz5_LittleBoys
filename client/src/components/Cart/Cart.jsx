import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge } from '@mui/material'
import FormUpdateQuantity from './FormUpdateQuantity'
import { useNavigate } from 'react-router-dom'
import ProceedToCheckout from './ProceedToCheckout'

export default function Cart({textColor}) {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const carts = useSelector(state => state.cart.value)

    const totalPrice = (data) => {
        const total = data.reduce((total, item) => total + (item.price * item.quantity), 0)
        return total.toFixed(2)
    }

    return (
        <>
            <Badge onClick={toggleDrawer(true)} badgeContent={carts.data.length} style={{ color: textColor ? textColor : '#000' }} className='button'>
                <ShoppingCartIcon />
            </Badge>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                <Box sx={{ width: '380px' }} role="presentation" onClick={toggleDrawer(false)}>
                    <Box sx={{ padding: '20px', fontSize: '20px', fontWeight: '500' }}>
                        Your Cart
                    </Box>
                </Box>

                {carts.exist && (
                    <List sx={{
                        padding: '0px 10px 10px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {carts.data.map(cart => (
                            <ListItem key={cart.id}>
                                <ListItemText sx={{ width: '100px', paddingRight: '8px' }}
                                    primary={cart.name}
                                    secondary={<>
                                        ${cart.price + " x " + cart.quantity}
                                        <p />
                                        {cart.product_quantity + " in stock"}
                                    </>}
                                    className='button'
                                    onClick={() => {
                                        navigate(`/product/${cart.product_id}`)
                                    }}
                                />

                                <FormUpdateQuantity qty={cart.quantity} id={cart.id} product_quantity={cart.product_quantity} />
                            </ListItem>
                        ))}
                    </List>
                )}

                <Box sx={{ padding: '20px', fontSize: '20px', fontWeight: '500', textAlign: 'right' }}>
                    Total: ${totalPrice(carts.data)}
                </Box>

                <Box sx={{ padding: '0px 20px' }}>
                    <ProceedToCheckout />
                </Box>
            </Drawer>
        </>
    )
}
