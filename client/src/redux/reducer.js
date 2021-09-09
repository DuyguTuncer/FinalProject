import { combineReducers } from "redux";
import chatMessagesReducer from "./messages/slice";


const rootReducer = combineReducers({
    chatMessages: chatMessagesReducer,
 
});

export default rootReducer;
