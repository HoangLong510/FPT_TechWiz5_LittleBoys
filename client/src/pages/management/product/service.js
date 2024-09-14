// src/pages/management/product/service.js
import axios from "~/axios";

// Lấy danh sách tất cả các sản phẩm
export const getProductsApi = async (page = 1) => {
    try {
        const res = await axios.get(`/management/products?page=${page}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], totalPages: 0 };
    }
};

// Lấy chi tiết một sản phẩm
export const getProductDetailApi = async (id) => {
    try {
        const res = await axios.get(`/management/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return { product: null };
    }
};

// Tạo một sản phẩm mới
export const createProductApi = async (data) => {
    try {
        const res = await axios.post('/management/products', data);
        return res.data;
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, message: "Failed to create product" };
    }
};

// Cập nhật một sản phẩm
export const updateProductApi = async (data) => {
    try {
        const res = await axios.put(`/management/products/${data.id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Failed to update product" };
    }
};
