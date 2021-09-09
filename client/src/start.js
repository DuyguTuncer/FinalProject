import ReactDOM from "react-dom";
import Welcome from "./welcome";
import axios from "axios";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import reducer from "./redux/reducer.js";
import thunk from "redux-thunk";
import { init } from "./socket";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data in Start: ", data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        init(store);

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});
