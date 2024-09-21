import axios from "~/axios";

// Function to generate random color
const getRandomColorAPI = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Lấy danh sách tất cả các sản phẩm cho biểu đồ đầu tiên (First Chart)
  export const getDataChartAPI = async (data = {}) => {
    try {
      const res = await axios.post('/management/fetch-data-chart', data);
      
      // Add random colors to the suppliers' data
      const suppliersWithColors = res.data.map(supplier => ({
        ...supplier,
        color: getRandomColorAPI(),  // Assign random color to each supplier
      }));
    
      return suppliersWithColors;  // Return the data with colors
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      return [];
    }
  };
// Lấy danh sách tất cả các sản phẩm của secondChart
export const getDataSecondChartAPI = async (data = {}) => {
    try {
        const res = await axios.post('/management/fetch-data-secondchart', data);
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        return [];
    }
};

