import ReactDOM from "react-dom";
import Welcome from "./welcome";
import axios from "axios";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";


const store = createStore(reducer, applyMiddleware(immutableState.default()));
const element = (
    <Provider store={store}>
        <App />
    </Provider>
);

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data: ", data);

    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(element, document.querySelector("main"));
    }
});
