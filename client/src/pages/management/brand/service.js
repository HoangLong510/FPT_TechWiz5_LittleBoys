import axios from "~/axios";

// Lấy danh sách tất cả các nhà cung cấp
export const getSupplierApi = async (data) => {
    try {
        const { search = '', page = 1 } = data;
        const res = await axios.get('/management/supplier', {
            params: { search, page }  // Truyền tham số search và page
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return { suppliers: [], totalPages: 0 };
    }
};


export const changeSupplierRoleApi = async (id) => {
    try {
      const res = await axios.put(`/management/change-role/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error changing supplier role:", error);
      throw error;
    }
  };
