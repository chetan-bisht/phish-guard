import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const analyzeEmail = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, { content });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};