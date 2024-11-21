import axios from 'axios';
import endPointConfig from './endPointConfig';

class AxiosInstance {
    constructor() {
        if (!AxiosInstance.instance) {
            this.axiosInstance = axios.create({
                baseURL: endPointConfig.serverIP + endPointConfig.apiBaseURL,
                timeout: 1000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            AxiosInstance.instance = this;
        }
    }

    getAxiosInstance() {
        return this.axiosInstance;
    }
}

const instance = new AxiosInstance();
Object.freeze(instance);

export default instance;