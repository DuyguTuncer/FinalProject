import ReactDOM from "react-dom";
import Welcome from "./welcome";
import axios from "axios";
import Monkeylogo from "./logo";

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

axios.get("/user/id.json").then(function ({ data }) {
    console.log("data: ", data);

    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        // user registered/is logged in therefore the user
        // should NOT see Welcome -> Registration, BUT instead see our logo
        ReactDOM.render(<Monkeylogo />, document.querySelector("main"));
    }
});
