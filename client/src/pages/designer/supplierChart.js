import axios from "~/axios";

// Fetch supplier product data for the chart
export const getSupplierChartAPI = async (data = {}) => {
    try {
        const res = await axios.post('/designer/fetch-data-chart', data); 
        return res.data;
    } catch (error) {
        console.error("Error fetching supplier chart data:", error.response?.data || error.message);
        return [];
    }
};
