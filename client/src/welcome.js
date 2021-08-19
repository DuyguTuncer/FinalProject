import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";

export default function Welcome() {
    return (
        <>
            {/* <h1>Welcome!</h1> */}
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </>
    );
}
