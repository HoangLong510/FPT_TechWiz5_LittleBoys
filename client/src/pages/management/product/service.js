import axios from "~/axios";

export const getProductsApi = async (data = {}) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/management/products', {
            params: { search, page }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], totalPages: 0 };
    }
};

export const getProductDetailApi = async (id) => {
    try {
        const response = await axios.get(`/management/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};

export const createProductApi = async (formData) => {
    try {
        const res = await axios.post('/management/products/create', formData, {
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

export const updateProductApi = async (id, formData) => {
    try {
        const response = await axios.post(`/management/products/${id}`, formData, {
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

export const getCategoriesApi = async () => {
    try {
        const response = await axios.get('/management/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const deleteProductApi = async (id) => {
    try {
        await axios.delete(`/management/products/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error; 
    }
};

