import axios from '~/axios'

export const fetchOrdersManagementApi = async (data) => {
    try {
        const res = await axios.post('/management/fetch-orders', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}

export const fetchOrderDetailManagementApi = async (id) => {
    try {
        const res = await axios.get(`/management/fetch-order-detail/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}

export const updateOrderTypeApi = async (data) => {
    try {
        const res = await axios.post('/management/update-order-type', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}