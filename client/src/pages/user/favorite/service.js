import axios from '~/axios'

export const fetchFavoritesApi = async (data) => {
    try {
        const res = await axios.post('/user/fetch-favorites', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}

export const removeFavoriteApi = async (id) => {
    try {
        const res = await axios.get(`/user/remove-favorite/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        return
    }
}