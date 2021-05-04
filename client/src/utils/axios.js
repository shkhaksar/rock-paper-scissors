import axios from 'axios';
import {BASE_URL} from '@/config';

/*
    Default time out for api requests in milliseconds
 */
const defaultTimeout = 60 * 1000


const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: defaultTimeout,
    headers: {'Content-Type': 'application/json'}
});

/**
 * Configure access token for requests
 */

axiosInstance.interceptors.request.use(
    config => {
        config.headers.authorization = 'Bearer ' + localStorage.getItem("token");
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;