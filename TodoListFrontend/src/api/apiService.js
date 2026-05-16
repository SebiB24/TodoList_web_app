import api from "./axiosConfig";
import { User } from "../models/User"

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
        try {
            const response = await api.post('/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserData: async () => {
        const response = await api.get('/auth/me')
        const responseUserData = response.data
        const userData = new User(
            responseUserData.name,
            responseUserData.email,
            responseUserData.userType,
            responseUserData.score
        )
        localStorage.setItem('userData', JSON.stringify(userData));
        return responseUserData;
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

    completeTask: async (taskId) => {
        try {
            const response = await api.put(`/tasks/${taskId}/complete`);
        } catch (error) {
            throw error;
        }
    },

    undoTask: async (taskId) => {
        try {
            const response = await api.put(`/tasks/${taskId}/undo`);
        } catch (error) {
            throw error;
        }
    },

    updateTask: async (taskId, updateTaskDto) => {
        try {
            const response = await api.put(`/tasks/${taskId}/update`, updateTaskDto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTask: async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}/delete`);
        } catch (error) {
            throw error;
        }
    }
};

export default ApiService;