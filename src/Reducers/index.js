import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import signInReducer from "./signInReducer";

const rootReducer = combineReducers({
    signInStore: signInReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

