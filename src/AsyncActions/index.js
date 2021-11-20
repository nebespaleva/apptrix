import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { setAuthorized, setLoading, setError } from "../Reducers/signInReducer";

const baseURL = 'http://erp.apptrix.ru/api/';

let token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}`}
})

axiosInstance.interceptors.request.use(async request => {
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

    const response = await axiosInstance(`${baseURL}token/refresh`, {
        refresh: localStorage.getItem('refresh_token')
    });

    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    request.headers.Authorization = `Bearer ${token}`;  

    return request;
}, error => {
    return Promise.reject(error);
})

export const postLogInData = (username, password) => dispatch => {
    const auth = {
        username,
        password
    }

    axiosInstance.post('token/', auth)
        .then(response => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            dispatch(setLoading(false));
            dispatch(setError(false));
            dispatch(setAuthorized(true));
        })
        .catch(error => {
            console.log(error);
            dispatch(setAuthorized(false));
            dispatch(setLoading(false));
            dispatch(setError(true));
            
        })
}