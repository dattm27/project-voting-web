import axios from 'axios';
import endPointConfig from './endPointConfig.js';

const instance = axios.create({
    baseURL: endPointConfig.serverIP + endPointConfig.apiBaseURL, // Thay thế bằng URL API của bạn
    timeout: 10000,
    withCredentials: true,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default instance;