import axios from "~/axios";

// Lấy danh sách tất cả các dự án
export const getProjectsApi = async (data = {}) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/designer/projects', {
            params: { search, page }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { projects: [], totalPages: 0 };
    }
};

// Lấy chi tiết một dự án
export const getProjectDetailApi = async (id) => {
    try {
        const response = await axios.get(`/designer/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project detail:', error);
        throw error;
    }
};

// Tạo một dự án mới
export const createProjectApi = async (formData) => {
    try {
        const res = await axios.post('/designer/projects/create', formData, {
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

// Cập nhật một dự án
export const updateProjectApi = async (id, formData) => {
    try {
        const response = await axios.post(`/designer/projects/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProjectApi = async (id) => {
    try {
        const response = await axios.delete(`/designer/projects/${id}`);
        return response.data;
    } catch (error) {
        if (error) {
            console.error('Error response:', error);
            return {
                success: false,
                message: [
                    {
                        en: 'An error occurred while deleting the project.',
                        vi: 'Đã xảy ra lỗi khi xóa dự án.'
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