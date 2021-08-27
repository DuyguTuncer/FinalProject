import { Component } from "react";
import axios from "axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OthersProfile from "./othersprofile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findpeople";
import { Link } from "react-router-dom";
import Friends from "./friends";
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
            bio: "",
            imageUploaderIsVisible: false,
            popupVisible: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
        this.updateBioInApp = this.updateBioInApp.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                if (data.success) {
                    console.log("data.userInfo", data.userInfo);
                    // console.log("data", data);
                    let { first, last, imageurl, bio } = data.userInfo;
                    this.setState({
                        first: first,
                        last: last,
                        imageUrl: imageurl,
                        bio: bio,
                    });
                    // } else {
                    //     const res = await axios.get("/api/logout/");
                    //     if (res.status == 200) {
                    //         location.replace("/");
                    //     }
                    // }
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

    popupToggleModal() {
        this.setState({
            popupVisible: !this.state.popupVisible,
        });
    }

    methodInApp(arg) {
        console.log("methodInApp is running! Argument passed is:", arg);
        this.setState({ imageUrl: arg });
        // this.toggleModal();
        // make sure you set the imageUrl you received from uploader in state!
    }

    updateBioInApp(updatedBio) {
        console.log("updatedBio in App: ", updatedBio);
        this.setState({
            bio: updatedBio,
        });
    }

    render() {
        // console.log("state in app", this.state);
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
                            {/* <Route
                                path="/findpeople"
                                render={(props) => <FindPeople />}
                            /> */}
                            <div className="links">
                                {/* <Link
                                    className="findPeopleLink"
                                    to="/findpeople"
                                >
                                    Find other people
                                </Link>
                                <Link className="friendsLink" to="/friends">
                                    Friends
                                </Link> */}
                                {/* yyyyyyyyyyyyyyyyyyyy */}
                                <Link className="map" to="/map">
                                    Map
                                </Link>
                                <Link className="chatLink" to="/chat">
                                    Chat
                                </Link>
                                <Link className="weatherLink" to="/weather">
                                    Weather
                                </Link>
                                {/* yyyyyyyyyyyyyyyyyyyy */}
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
                                {/* yyyyyyyyyyyyyyyyyyyy */}
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
                    <div className="profileContainer">
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                    bio={this.state.bio}
                                    updateBioInApp={this.updateBioInApp}
                                />
                            )}
                        />
                    </div>
                    <div className="findPeopleContainer">
                        <Route
                            path="/findpeople"
                            render={(props) => <FindPeople />}
                        />
                    </div>
                    {/* <div>
                        <div className="layout">
                            <div className="uploader">
                                {this.state.imageUploaderIsVisible && (
                                    <Uploader
                                        className="InnerUploader"
                                        methodInApp={this.methodInApp}
                                        toggleModal={this.toggleModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div> */}

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OthersProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/friends"
                        render={(props) => (
                            <Friends
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
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
