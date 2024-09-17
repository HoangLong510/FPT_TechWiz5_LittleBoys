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
export const createBrandApi = async (formData) => {
    try {
        const res = await axios.post('/management/create-brand', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Đảm bảo đúng Content-Type
            }
        });
        return res.data;
    } catch (error) {
        // Xử lý lỗi cụ thể
        if (error.response) {
            // Log chi tiết lỗi từ phản hồi của server
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
            return error.response.data;
        } else {
            console.error('Error message:', error.message);
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
export const updateBrandApi = async (id, formData) => {
    try {
        const response = await axios.post(`/management/update-brand/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('API Response:', response.data); // Xem dữ liệu trả về từ API
        return response.data;
    } catch (error) {
        console.error('Error updating brand:', error);
        throw error;
    }
};

// Xóa một thương hiệu
export const deleteBrandApi = async (id) => {
    try {
        const response = await axios.delete(`/management/delete-brand/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting brand:', error);
        throw error; // Đẩy lỗi lên để xử lý trong component
    }
};
