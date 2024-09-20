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