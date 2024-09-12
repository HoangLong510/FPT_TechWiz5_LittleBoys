import axios from '~/axios'

export const logoutApi = async () => {
    try {
        const res = await axios.post('/auth/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return {
            success: false
        }
    }
}