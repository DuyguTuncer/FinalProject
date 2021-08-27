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

// const store = createStore(reducer,
//     applyMiddleware(immutableState.default()
//     ));
// const element = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

// axios.get("/user/id.json").then(function ({ data }) {
//     console.log("data: ", data);

//     if (!data.userId) {
//         ReactDOM.render(<Welcome />, document.querySelector("main"));
//     } else {
//         ReactDOM.render(element, document.querySelector("main"));
//     }
// });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default(), thunk))
);

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data in Start: ", data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        // user registered/is logged in therefore the user
        // should NOT see Welcome -> Registration, BUT instead see our logo
        init(store);

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});
