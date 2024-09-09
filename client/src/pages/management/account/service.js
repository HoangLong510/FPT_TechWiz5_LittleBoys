import axios from "~/axios"

export const getAccountsManagementApi = async (search) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))

        if (token.value) {
            const res = await axios.post('/management/get-accounts', { search }, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })

            return res.data.accounts
        }

        return []
    } catch (error) {
        return []
    }
}