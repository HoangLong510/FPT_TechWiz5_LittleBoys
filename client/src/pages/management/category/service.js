import axios from "~/axios";

// Lấy danh sách tất cả các danh mục
export const getCategoriesApi = async (data) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/management/categories', {
            params: { search, page } // Gửi tham số tìm kiếm và phân trang
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 0 };
    }
};

// Lấy chi tiết một danh mục
export const getCategoryDetailApi = async (id) => {
    try {
        const response = await axios.get(`/management/get-category-detail/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching category detail:', error);
        throw error; 
    }
};

// Tạo một danh mục mới
export const createCategoryApi = async (formData) => {
    try {
        const res = await axios.post('/management/create-category', formData, {
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

// Cập nhật một danh mục
export const updateCategoryApi = async (id, formData) => {
    try {
        const response = await axios.post(`/management/update-category/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('API Response:', response.data); // Xem dữ liệu trả về từ API
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Xóa một danh mục
export const deleteCategoryApi = async (id) => {
    try {
        await axios.delete(`/management/delete-category/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error; // Đẩy lỗi lên để xử lý trong component
    }
};
