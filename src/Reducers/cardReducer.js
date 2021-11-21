const SET_DATA_TO_CARDS = 'SET_DATA_TO_CARDS';
const SET_CARDS_LOADING = 'SET_LOADING';
const SET_CURRENT_CARD_ID = 'SET_CURRENT_CARD_ID';

const initialState = {
    cards: [],
    loading: false,
    currentCardID: '',
}

export default function cardReducer(state = initialState, action) {
    switch(action.type) {
        case SET_DATA_TO_CARDS:
            return {
                ...state,
                cards: [
                    ...action.payload
                ]
            }
        case SET_CARDS_LOADING: 
            return {
                ...state,
                loading: action.payload
            }
        case SET_CURRENT_CARD_ID:
            return {
                ...state,
                currentCardID: action.payload
            }
        default:
            return state;
    }
};

export const setDataToCards = (payload) => ({type: SET_DATA_TO_CARDS, payload});
export const setCardsLoading = (payload) => ({type: SET_CARDS_LOADING, payload});
export const setCurrentCardID = (payload) => ({type: SET_CURRENT_CARD_ID, payload});