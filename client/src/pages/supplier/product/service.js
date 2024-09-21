import axios from "~/axios";

// Lấy danh sách tất cả các sản phẩm
export const getProductsApi = async (data = {}) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/supplier/products', {
            params: { search, page }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], totalPages: 0 };
    }
};

// Lấy chi tiết một sản phẩm
export const getProductDetailApi = async (id) => {
    try {
        const response = await axios.get(`/supplier/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};

// Tạo một sản phẩm mới
export const createProductApi = async (formData) => {
    try {
        const res = await axios.post('/supplier/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
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

// Cập nhật một sản phẩm
export const updateProductApi = async (id, formData) => {
    try {
        const response = await axios.post(`/supplier/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Xóa một sản phẩm
export const deleteProductApi = async (id) => {
    try {
        const response = await axios.delete(`/supplier/products/${id}`);
        return response.data;
    } catch (error) {
        if (error) {
            console.error('Error response:', error);
            return {
                success: false,
                message: [
                    {
                        en: 'An error occurred while deleting the product.',
                        vi: 'Đã xảy ra lỗi khi xóa sản phẩm.'
                    }
                ]
            };
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

// Lấy danh sách các danh mục
export const getCategoriesApi = async () => {
    try {
        const response = await axios.get('/supplier/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Lấy danh sách các thương hiệu

