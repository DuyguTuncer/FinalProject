import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
});

export default rootReducer;
