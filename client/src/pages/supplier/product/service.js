import axios from "~/axios";

// Lấy danh sách tất cả các sản phẩm
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

// Lấy chi tiết một sản phẩm
export const getProductDetailApi = async (id) => {
    try {
        const response = await axios.get(`/management/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};

// Tạo một sản phẩm mới
export const createProductApi = async (formData) => {
    try {
        const res = await axios.post('/management/products', formData, {
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
        const response = await axios.post(`/management/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('API Response:', response.data); // Xem dữ liệu trả về từ API
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Xóa một sản phẩm
export const deleteProductApi = async (id) => {
    try {
      const response = await axios.delete(`/management/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

// Lấy danh sách các danh mục
export const getCategoriesApi = async () => {
    try {
        const response = await axios.get('/management/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Lấy danh sách các thương hiệu
export const getBrandsApi = async () => {
    try {
        const response = await axios.get('/management/brands');
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
};
