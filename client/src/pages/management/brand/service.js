// src/pages/management/brand/service.js
import axios from "~/axios";

// Lấy danh sách tất cả các thương hiệu
export const getBrandsApi = async (data) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/management/brands', {
            params: { search, page } // Gửi tham số tìm kiếm và phân trang
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return { brands: [], totalPages: 0 };
    }
};

// Lấy chi tiết một thương hiệu
export const getBrandDetailApi = async (id) => {
    try {
        const response = await axios.get(`/management/get-brand-detail/${id}`);
        return response.data; // Điều chỉnh nếu dữ liệu trả về có cấu trúc khác
    } catch (error) {
        console.error('Error fetching brand detail:', error);
        throw error; // Đẩy lỗi lên để xử lý trong component
    }
};

// Tạo một thương hiệu mới
export const createBrandApi = async (data) => {
    try {
        const res = await axios.post('/management/create-brand', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            return {
                success: false,
                message: [
                    {
                        en: 'Server is busy. Please try again later!',
                        vi: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau!'
                    }
                ]
            };
        }
    }
};

// Cập nhật một thương hiệu
export const updateBrandApi = async (data) => {
    try {
        const response = await axios.post('/management/update-brand', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Điều chỉnh nếu dữ liệu trả về có cấu trúc khác
    } catch (error) {
        console.error('Error updating brand:', error);
        throw error; // Đẩy lỗi lên để xử lý trong component
    }
};
