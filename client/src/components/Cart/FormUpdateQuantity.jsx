import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from '~/libs/features/cart/cartSlice'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { updateQuantityCartApi } from './service'

export default function FormUpdateQuantity({ id, qty }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(qty)

    const handleUpdateQuantityCart = async (e) => {
        dispatch(setLoading())
        e.preventDefault()

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
        dispatch(clearLoading())
    }

    return (
        <form onSubmit={handleUpdateQuantityCart}>
            <TextField sx={{ width: '70px' }}
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                type="number"
                onBlur={() => setQuantity(qty)}
            />
        </form>
    )
}
