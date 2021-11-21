import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import signInReducer from "./signInReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
    signInStore: signInReducer,
    cardStore: cardReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

