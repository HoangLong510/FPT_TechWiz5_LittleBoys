import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: {
      exist: false,
      data: []
   }
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCart: (state, action) => {
         state.value = {
            exist: true,
            data: action.payload
         }
      },
      clearCart: (state) => {
         state.value = {
            exist: false,
            data: []
         }
      }
   }
})

export const { setCart, clearCart } = cartSlice.actions

export default cartSlice.reducer