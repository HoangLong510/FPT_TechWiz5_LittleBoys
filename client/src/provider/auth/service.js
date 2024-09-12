import axios from '~/axios'

export const fetchDataUserApi = async () => {
    try {
        const res = await axios.get('/auth/fetch-data', {
            headers: {
                'Content-Type': 'application/json'
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