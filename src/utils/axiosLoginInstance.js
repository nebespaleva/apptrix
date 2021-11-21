import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = 'http://erp.apptrix.ru/api/';

let token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

const axiosLoginInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}`}
})

axiosLoginInstance.interceptors.request.use(async request => {
    let user;
    let isExpired;

    if (!token) {
        token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
        request.headers.Authorization = `Bearer ${token}`;
    }

    if (token) {
        user = jwtDecode(token);
        isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    }

    if (!isExpired) return request;

    const response = await axiosLoginInstance(`${baseURL}token/refresh`, {
        refresh: localStorage.getItem('refresh_token')
    });

    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    request.headers.Authorization = `Bearer ${token}`;  

    return request;
}, error => {
    return Promise.reject(error);
});

export default axiosLoginInstance;