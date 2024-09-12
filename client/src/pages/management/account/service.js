import axios from "~/axios"

export const getAccountsManagementApi = async (data) => {
    try {
        const res = await axios.post('/management/get-accounts', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.data
    } catch (error) {
        return []
    }
}

export const getAccountDetailApi = async (id) => {
    try {
        const res = await axios.get(`/management/get-account-detail/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.data
    } catch (error) {
        return []
    }
}

export const updateAccountRoleApi = async (data) => {
    try {
        const res = await axios.post(`/management/update-role`, data, {
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

export const lockAccountApi = async (id) => {
    try {
        const res = await axios.get(`/management/lock-account/${id}`, {
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

export const unlockAccountApi = async (id) => {
    try {
        const res = await axios.get(`/management/unlock-account/${id}`, {
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