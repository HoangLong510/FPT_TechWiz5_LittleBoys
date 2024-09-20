import axios from '~/axios'

export const removeToCartApi = async (id) => {
    try {
        const res = await axios.get(`/user/remove-to-cart/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return []
    }
}

export const updateQuantityCartApi = async (data) => {
    try {
        const res = await axios.post('/user/update-quantity-cart', data, {
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