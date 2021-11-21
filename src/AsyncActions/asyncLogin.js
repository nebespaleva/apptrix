import axiosLoginInstance from "../utils/axiosLoginInstance";
import { setAuthorized, setLoading, setError } from "../Reducers/signInReducer";

export const postLogInData = (username, password) => dispatch => {
    const auth = {
        username,
        password
    }

    axiosLoginInstance.post('token/', auth)
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