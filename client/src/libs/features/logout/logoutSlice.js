import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: false,
}

export const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {
		setLogout: (state) => {
			state.value = true
		},
		clearLogout: (state) => {
			state.value = false
		}
	}
})

export const { setLogout, clearLogout } = logoutSlice.actions

export default logoutSlice.reducer