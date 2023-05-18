import axios from 'axios';

export default axios.create({
    baseURL: 'https://back-end-m05.onrender.com/',
    timeout: 100000,
    headers: { 'Content-Type': 'application/json' }
});