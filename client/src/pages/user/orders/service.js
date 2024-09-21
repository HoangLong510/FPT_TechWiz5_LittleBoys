import axios from '~/axios'

export const fetchOrdersApi = async (data) => {
    try {
        const res = await axios.post('/user/fetch-orders', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}

export const fetchOrderDetailApi = async (id) => {
    try {
        const res = await axios.get(`/user/fetch-order-detail/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}