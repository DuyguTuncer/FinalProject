import { combineReducers } from "redux";
import friendsReducer from "./friends/slice";
import chatMessagesReducer from "./messages/slice";


const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
    chatMessages: chatMessagesReducer,
 
});

export default rootReducer;
