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

export const deleteProductApi = async (id) => {
    try {
        await axios.delete(`/management/products/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error; 
    }
};

