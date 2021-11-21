import axiosCardInstance from "../utils/axiosCardInstance";
import { setDataToTasks, setCardsLoading } from "../Reducers/cardReducer";

export const postDataToTasksTable = () => dispatch => {
    axiosCardInstance.get('issues?fields=id,summary,project(name)')
    .then(response => {
        dispatch(setDataToTasks(response.data));
        dispatch(setCardsLoading(false));
    });
};

export const postFilteredDataToTaskTable = (value) => dispatch => {
    axiosCardInstance.get(`issues?fields=id,summary,project(name)&query=project:+%7B${value}%7D`)
    .then(response => {
        dispatch(setDataToTasks(response.data));
        dispatch(setCardsLoading(false));
    })
}