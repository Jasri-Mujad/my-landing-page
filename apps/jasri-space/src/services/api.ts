import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with credentials for cookie-based auth
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// --- PROJECTS ---
export const getProjects = async () => {
    const response = await api.get('/api/projects');
    return response.data;
};

export const createProject = async (data: any) => {
    const response = await api.post('/api/projects', data);
    return response.data;
};

export const updateProject = async (id: string, data: any) => {
    const response = await api.put(`/api/projects/${id}`, data);
    return response.data;
};

export const deleteProject = async (id: string) => {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
};

// --- FEEDS ---
export const getFeeds = async () => {
    const response = await api.get('/api/feeds');
    return response.data;
};

export const createFeed = async (data: any) => {
    const response = await api.post('/api/feeds', data);
    return response.data;
};

export const updateFeed = async (id: string, data: any) => {
    const response = await api.put(`/api/feeds/${id}`, data);
    return response.data;
};

export const deleteFeed = async (id: string) => {
    const response = await api.delete(`/api/feeds/${id}`);
    return response.data;
};

// --- MOOD ---
export const getMood = async () => {
    const response = await api.get('/api/mood');
    return response.data;
};

export const createMood = async (data: any) => {
    const response = await api.post('/api/mood', data);
    return response.data;
};

export const updateMood = async (id: string, data: any) => {
    const response = await api.put(`/api/mood/${id}`, data);
    return response.data;
};

export const addMoodComment = async (id: string, data: { user: string; text: string }) => {
    const response = await api.post(`/api/mood/${id}/comments`, data);
    return response.data;
};

// --- TRACKS (Playlist) ---
export const getTracks = async () => {
    const response = await api.get('/api/tracks');
    return response.data;
};

export const createTrack = async (data: any) => {
    const response = await api.post('/api/tracks', data);
    return response.data;
};

export const updateTrack = async (id: string, data: any) => {
    const response = await api.put(`/api/tracks/${id}`, data);
    return response.data;
};

export const deleteTrack = async (id: string) => {
    const response = await api.delete(`/api/tracks/${id}`);
    return response.data;
};

// --- PROFILE ---
export const getProfile = async () => {
    const response = await api.get('/api/profile');
    return response.data;
};

export const createProfile = async (data: any) => {
    const response = await api.post('/api/profile', data);
    return response.data;
};

export const updateProfile = async (id: string, data: any) => {
    const response = await api.put(`/api/profile/${id}`, data);
    return response.data;
};

export const addSocialLink = async (profileId: string, data: any) => {
    const response = await api.post(`/api/profile/${profileId}/social-links`, data);
    return response.data;
};

export const deleteSocialLink = async (profileId: string, linkId: string) => {
    const response = await api.delete(`/api/profile/${profileId}/social-links/${linkId}`);
    return response.data;
};

// --- AUTH ---
export const login = async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const checkAuth = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// --- UPLOAD ---
export const uploadFile = async (formData: FormData) => {
    const response = await api.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

// --- STATS ---
export const getStats = async () => {
    const response = await api.get('/api/stats');
    return response.data;
};

// --- ACTIVITY ---
export const getActivityLogs = async (limit: number = 10) => {
    const response = await api.get(`/api/activity?limit=${limit}`);
    return response.data;
};

// --- COMMAND CENTER ---
export const getCommandCenterImages = async () => {
    const response = await api.get('/api/command-center');
    return response.data;
};

export const updateCommandCenterImages = async (images: string[]) => {
    const response = await api.post('/api/command-center', { images });
    return response.data;
};

// --- PASSWORD ---
export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
};

export default api;
