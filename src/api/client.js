import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.PROD
        ? 'https://acm-xim-envoy-backend.onrender.com/api'
        : '/api',
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
