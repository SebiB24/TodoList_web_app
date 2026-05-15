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
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try{
            const response = await api.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

// TASKS ----------------------------------------------------------------------------------------------------

    loadTasks: async (filters) => {
        try {
            const response = await api.get('/tasks', { params: filters });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createTask: async (createTaskData) => {
        try {
            const response = await api.post('/tasks', createTaskData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    completeTask: async(taskId) =>{
        try{
            const response = await api.put(`/tasks/${taskId}/complete`);
        }catch(error){
            throw error;
        }
    }
};

export default ApiService;