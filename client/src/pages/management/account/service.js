import axios from "~/axios"

export const getAccountsManagementApi = async (data) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))

        if (token.value) {
            const res = await axios.post('/management/get-accounts', data, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })

            return res.data
        }

        return []
    } catch (error) {
        return []
    }
}