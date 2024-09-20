import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from '~/libs/features/cart/cartSlice'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { updateQuantityCartApi } from './service'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useTranslation } from 'react-i18next'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function FormUpdateQuantity({ id, qty }) {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [openPopupDelete, setOpenPopupDelete] = useState(false)
    const [quantity, setQuantity] = useState(qty)

    const changeValue = (e) => {
        const regex = /^\d+$/
        if (regex.test(e.target.value)) {
            setQuantity(e.target.value.replace(/^0+/, ''))
        } else if (!e.target.value) {
            setQuantity(0)
        }
    }

    const handleUpdateQuantityCart = async (e) => {
        e.preventDefault()
        if (!quantity) {
            setOpenPopupDelete(true)
        } else {
            const data = {
                id,
                quantity
            }

            const res = await updateQuantityCartApi(data)

            if (res.success) {
                dispatch(setCart(res.carts))
            } else {
                const dataPopup = {
                    type: "error",
                    message: res.message,
                }
                dispatch(setPopup(dataPopup))
            }
        }
    }

    const handleCountQuantityCart = async (value) => {
        if (quantity == 1 && value == 0) {
            setOpenPopupDelete(true)
            setQuantity(0)
        } else {
            const data = {
                id,
                quantity: value
            }

            const res = await updateQuantityCartApi(data)

            if (res.success) {
                dispatch(setCart(res.carts))
                setQuantity(value)
            } else {
                const dataPopup = {
                    type: "error",
                    message: res.message,
                }
                dispatch(setPopup(dataPopup))
            }
        }
    }

    return (
        <>
            <form onSubmit={handleUpdateQuantityCart} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    sx={{ minWidth: '40px', height: '40px', p: 0 }}
                    onClick={() => handleCountQuantityCart(quantity - 1)}
                >
                    -
                </Button>
                <TextField sx={{ width: '50px', mx: 1, '& input': { textAlign: 'center' } }}
                    size='small'
                    value={quantity}
                    onChange={changeValue}
                    type="text"
                    onBlur={handleUpdateQuantityCart}
                />
                <Button
                    variant="outlined"
                    sx={{ minWidth: '40px', height: '40px', p: 0 }}
                    onClick={() => handleCountQuantityCart(quantity + 1)}
                >
                    +
                </Button>
            </form>

            {/* Popup delete */}
            <React.Fragment>
                <Dialog
                    open={openPopupDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => { setOpenPopupDelete(false) }}
                    aria-describedby="alert-confirm-delete-product"
                >
                    <DialogTitle>Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-confirm-delete-product">
                            Are you sure you want to delete this product from the cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpenPopupDelete(false)
                            setQuantity(qty)
                        }}>
                            {t("Close")}
                        </Button>
                        <Button variant='contained' onClick={() => { handleCountQuantityCart(0) }}>{t("Agree")}</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
