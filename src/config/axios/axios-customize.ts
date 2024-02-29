import axios from "axios";
import { IAccount, IBackendRes } from "../../types/backend";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true //save cookie 
});

/**
 * get new access_token 
 */
const handleRefreshToken = async () => {
    const res = await axios.get<IBackendRes<IAccount>>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`, { withCredentials: true })
    if (res && res.data) return res.data.data?.access_token
    else return null;
}

/**
 * config headers
 */
instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

/**
 * handle case access_token expire, get new access_token
 */
instance.interceptors.response.use(function (config) {
    return config;
}, async function (error) {
    if (error.config
        && error.response
        && error.response?.data?.statusCode === 401
        && error.config.url !== '/api/v1/auth/login'
    ) {
        const access_token = await handleRefreshToken();
        if (access_token) {
            error.config.headers['Authorization'] = `Bearer ${access_token}`;
            localStorage.setItem('access_token', access_token!);
            return instance.request(error.config);
        }

    }
    return error?.response?.data ?? Promise.reject(error);
});

export default instance;