const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_AUTHORIZED = 'SET_AUTHORIZED';

const initialState = {
    loading: false,
    error: false,
    isAuthorized: false,
}

export default function signInReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case SET_AUTHORIZED:
            return { ...state, isAuthorized: action.payload };
        default:
            return state;
    }
};

export const setAuthorized = (payload) => ({ type: SET_AUTHORIZED, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setError = (payload) => ({ type: SET_ERROR, payload });