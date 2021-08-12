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
            <section>
                <form className="login">
                    <h1>Log in</h1>

                    {this.state.error && (
                        <h2 style={{ color: "red" }}>
                            {this.state.errMessage} Error!!!!!!!
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
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Log in
                    </button>
                    <div>
                        Did you forget your password?
                        <p>
                            {/* Reset password{" "} */}
                            <Link to="/password-reset">
                                Reset your password here!
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        );
    }
}