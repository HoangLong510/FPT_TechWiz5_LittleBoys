import axios from "~/axios"

export const fetchAccountsManagementApi = async (data) => {
    try {
        const res = await axios.post('/management/fetch-accounts', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.data
    } catch (error) {
        return []
    }
}

export const fetchAccountDetailApi = async (id) => {
    try {
        const res = await axios.get(`/management/fetch-account-detail/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.data
    } catch (error) {
        return []
    }
}

export const updateAccountApi = async (data) => {
    try {
        const res = await axios.post(`/management/account/update`, data, {
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