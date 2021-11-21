import axiosCardInstance from "../utils/axiosCardInstance";
import { setDataToCards, setCardsLoading } from "../Reducers/cardReducer";

export const postDataToCardsTable = () => dispatch => {
    axiosCardInstance.get('admin/users?fields=id,login,name,email')
        .then(response => {
            dispatch(setDataToCards(response.data));
            dispatch(setCardsLoading(false));
        });
}
