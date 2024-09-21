import axios from 'axios';

export const getDesignerInfoApi = async (userId) => {
  try {
    const response = await axios.get(`/designer/info/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching designer info:', error);
    throw error;
  }
};

export const getDesignerProjectsApi = async (userId) => {
  try {
    const response = await axios.get(`/designer/projects/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching designer projects:', error);
    throw error;
  }
};

export const createMeetingApi = async (meetingData) => {
    try {
      const response = await axios.post('/meetings', meetingData);
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  };


  export const getDesignerMeetingsApi = async (designerId) => {
    try {
      const response = await axios.get(`/meetings/designer/${designerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching designer meetings:', error);
      throw error;
    }
  };

  export const updateMeetingStatusApi = async (meetingId, status) => {
    try {
      const response = await axios.put(`/meetings/${meetingId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating meeting status:', error);
      throw error;
    }
  };

  export const deleteMeetingApi = async (meetingId) => {
    try {
      const response = await axios.delete(`/meetings/${meetingId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting meeting:', error);
      throw error;
    }
  };