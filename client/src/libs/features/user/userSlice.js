import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   value: {
      exist: false,
      data: {}
   }
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.value = {
            exist: true,
            data: action.payload
         }
      },
      clearUser: (state) => {
         state.value = {
            exist: false,
            data: {}
         }
      }
   }
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer