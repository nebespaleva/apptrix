import axios from "axios";

const baseURL = "https://cors-anywhere.herokuapp.com/https://demo-apptrix.myjetbrains.com/youtrack/api/";

const axiosCardInstance = axios.create({
    baseURL,
    headers: { 
        Authorization: "Bearer perm:cm9vdA==.NDktMQ==.LFQD3WeI6Jr9SyKbN02s924HLyScsb",
        Accept: "application/json",
        'Cache-Control': "no-cache",
        'Access-Control-Allow-Origin' : "*",

    }
});

axiosCardInstance.interceptors.request.use(request => {
    request.headers.Authorization = "Bearer perm:cm9vdA==.NDktMQ==.LFQD3WeI6Jr9SyKbN02s924HLyScsb";
    request.headers.Accept = "application/json";

    return request;
}, error => {
    return Promise.reject(error);
});

export default axiosCardInstance;