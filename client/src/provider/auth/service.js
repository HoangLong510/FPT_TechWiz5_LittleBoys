import axios from '~/axios'

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

export const refreshTokenApi = async (token) => {
    try {
        const res = await axios.get('/auth/refresh', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        return null
    }
}