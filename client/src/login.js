import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        console.log("which input is running handleChange?", target.name);
        console.log("value the user typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Login:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user clicked login");
        console.log("this.state in login", this.state);
        axios
            .post("/login", this.state)
            .then((resp) => {
                console.log("response", resp);
                console.log("response.data", resp.data);
                console.log("resp.data.success", resp.data.success);

                if (resp.data.success) {
                    location.reload();
                    // console.log(" location.reload();",   location.reload());
                    console.log("login is successfull");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("something went wrong in POST /login", err);
                this.setState({
                    error: true,
                });
            });
    }
    componentDidMount() {
        console.log("Login just mounted");
    }

    render() {
        return (
            <div>
                <form className="login">
                    <div className="loginContainer1">
                        <img
                            className="regsiterImage"
                            src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210421112606-20210421-socializing-office-gfx.jpg"
                        ></img>
                    </div>
                    <div className="loginContainer2">
                        {this.state.error && (
                            <h2 style={{ color: "white" }}>
                                {this.state.errMessage} Please make sure to fill
                                all the input fields correctly
                            </h2>
                        )}

                        <input
                            name="emailAddress"
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <button
                            className="registerButton"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Log in
                        </button>
                        <div>
                            <p className="registerText">
                                Did you forget your password?
                            </p>
                            <p className="registerText">
                                {/* Reset password{" "} */}
                                <Link to="/password-reset">
                                    Reset your password here!
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
