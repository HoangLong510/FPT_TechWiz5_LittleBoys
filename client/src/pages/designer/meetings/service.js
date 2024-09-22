import axios from "~/axios";

export const getMeetings = async () => {
    try {
        const response = await axios.get('/meetings');
        return response.data;
    } catch (error) {
        console.error('Error fetching meetings:', error);
        throw error;
    }
};

export const updateMeetingStatus = async (id, formData) => {
    try {
        const response = await axios.post(`/meetings/${id}/status`, formData , {
           headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating meeting status:', error);
        throw error;
    }
};