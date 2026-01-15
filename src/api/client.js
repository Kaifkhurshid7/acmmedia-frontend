import axios from 'axios';

const client = axios.create({
    baseURL: 'https://acmmedia-backend.onrender.com/api'
    // baseURL: 'http://localhost:5000/api'
    
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
