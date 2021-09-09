import { Component } from "react";
import axios from "axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Chat from "./chat";
import Map from "./map";
import Weather from "./weather";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first: "",
            last: "",
            imageUrl: "",
            imageUploaderIsVisible: false,
            popupVisible: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                if (data.success) {
                    console.log("data.userInfo", data.userInfo);
                    // console.log("data", data);
                    let { first, last, imageurl } = data.userInfo;
                    this.setState({
                        first: first,
                        last: last,
                        imageUrl: imageurl,
                    });
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log("error in axios get request for /user ", err);
                this.setState({ error: true });
            });
    }

    toggleModal() {
        this.setState({
            imageUploaderIsVisible: !this.state.imageUploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("methodInApp is running! Argument passed is:", arg);
        this.setState({ imageUrl: arg });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="mainContainer">
                    <div className="mainHeaderContainer">
                        <div className="header">
                            {this.state.error && (
                                <h1>
                                    Something went wrong with the provided
                                    information
                                </h1>
                            )}
                            <Logo className="logo" />
                            <div className="links">
                                <Link className="map" to="/map">
                                    Map
                                </Link>
                                <Link className="chatLink" to="/chat">
                                    Chat
                                </Link>
                                <Link className="weatherLink" to="/weather">
                                    Weather
                                </Link>
                                <Link
                                    className="logoutLink"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const res = await axios.get(
                                            "/api/logout/"
                                        );
                                        if (res.status == 200) {
                                            location.replace("/");
                                        }
                                    }}
                                >
                                    Log out
                                </Link>
                            </div>
                        </div>
                        <div className="header2">
                            <div onClick={this.toggleModal}>
                                <ProfilePic
                                    className="profilePic"
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="layout">
                            <div className="uploader">
                                {this.state.imageUploaderIsVisible && (
                                    <Uploader
                                        methodInApp={this.methodInApp}
                                        toggleModal={this.toggleModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mapContainer">
                        <div className="mapInner">
                            <Route
                                path="/map"
                                render={(props) => (
                                    <Map
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        popupToggleModal={this.popupToggleModal}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="weatherContainer">
                        <div className="weatherInner">
                            <Route
                                path="/weather"
                                render={(props) => (
                                    <Weather
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Route path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        );
    }
}
