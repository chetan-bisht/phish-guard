import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const analyzeEmail = async (content) => {
    const response = await axios.post(`${API_URL}/analyze`, { content }, getConfig());
    return response.data;
};

export const getHistory = async () => {
    const response = await axios.get(`${API_URL}/history`, getConfig());
    return response.data;
};