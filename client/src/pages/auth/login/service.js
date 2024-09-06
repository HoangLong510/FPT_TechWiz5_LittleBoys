import axios from "~/axios"

export const loginApi = async (data) => {
    try {
        const res = await axios.post('/auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        if (error.response && error.response.status !== 500) {
            return error.response.data
        } else {
            return {
                success: false,
                message: [{
                    en: 'Server is busy. Please try again later!',
                    vi: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau!'
                }]
            }
        }
    }
}

export const fetchDataUserApi = async (token) => {
    try {
        const res = await axios.get('/auth/fetch-data', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (res.data.user){
            return res.data.user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}