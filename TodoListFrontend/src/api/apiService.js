import api from "./axiosConfig";

const ApiService = {
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (loginData) => {
        try {
            const response = await api.post('/auth/login', loginData);
            console.log('Login response:', response.data);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ApiService;