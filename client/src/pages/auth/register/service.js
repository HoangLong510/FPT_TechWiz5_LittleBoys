import axios from "~/axios"

export const registerApi = async (data) => {
    try {
        const res = await axios.post('/auth/register', data, {
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

export const registerDesigner = async (data, userId) => {
    try {
        const res = await axios.post(`/auth/register-designer`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data; 
    } catch (error) {
        // Xử lý lỗi phản hồi từ server
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'An error occurred. Please try again later.',
            };
        } else {
            return {
                success: false,
                message: [{
                    en: 'Server is busy. Please try again later!',
                    vi: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau!'
                }]
            };
        }
    }
}

