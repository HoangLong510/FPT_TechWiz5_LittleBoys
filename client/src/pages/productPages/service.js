import axios from '~/axios'

export const fetchDataProductsApi = async (data) => {
    try {
        const res = await axios.post('/product/fetch-data-products', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return []
    }
}

export const fetchDataCategoriesApi = async () => {
    try {
        const res = await axios.get('/product/fetch-data-categories', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return []
    }
}

export const fetchDataProductDetailApi = async (id) => {
    try {
        const res = await axios.get(`/product/fetch-data-product-detail/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return []
    }
}

export const addToCartApi = async (id) => {
    try {
        const res = await axios.get(`/user/add-to-cart/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return
    }
}

export const removeToCartApi = async (id) => {
    try {
        const res = await axios.get(`/product/remove-to-cart/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return []
    }
}

export const commentApi = async (data) => {
    try {
        const res = await axios.post(`/product/comment`, data, {
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

export const fetchCommentsApi = async (productId) => {
    try {
        const res = await axios.get(`/product/fetch-comments/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        return
    }
}