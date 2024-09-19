import axios from "~/axios"

export const fetchActivityLogsApi = async () => {
    try {
        const res = await axios.get('/management/fetch-activity-logs', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res.data;
    } catch (error) {
        return [];
    }
};