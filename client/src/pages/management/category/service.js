// src/pages/management/category/service.js
import axios from "~/axios";

// Lấy danh sách tất cả các danh mục
export const getCategoriesApi = async () => {
    try {
        const res = await axios.get('/management/categories');
        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categories: [], totalPages: 0 };
    }
};

// Lấy chi tiết một danh mục
export const getCategoryDetailApi = async (id) => {
    try {
        const res = await axios.get(`/management/categories/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching category detail:", error);
        return { category: null };
    }
};

// Tạo một danh mục mới
export const createCategoryApi = async (data) => {
    try {
        const res = await axios.post('/management/categories', data);
        return res.data;
    } catch (error) {
        console.error("Error creating category:", error);
        return { success: false, message: "Failed to create category" };
    }
};

// Cập nhật một danh mục
export const updateCategoryApi = async (data) => {
    try {
        const res = await axios.put(`/management/categories/${data.id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, message: "Failed to update category" };
    }
};
