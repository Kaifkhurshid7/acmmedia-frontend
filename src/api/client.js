import axios from 'axios';

const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || 'https://acmmedia-backend.onrender.com/api';

const client = axios.create({
    baseURL: apiBaseUrl
});

// Add interceptor to include token in requests
client.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default client;
