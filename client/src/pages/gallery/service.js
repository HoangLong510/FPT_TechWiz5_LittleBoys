import axios from 'axios';

export const getProjectsApi = async (data) => {
  try {
    const res = await axios.post('http://localhost:8000/api/projects/fetch-data-projects', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};


export const getProjectDetailApi = async (id) => {
    try {
      // Thay đổi URL này để bao gồm đầy đủ đường dẫn
      const res = await axios.get(`http://localhost:8000/api/projects/fetch-data-project-detail/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching project detail:', error);
      throw error;
    }
  };