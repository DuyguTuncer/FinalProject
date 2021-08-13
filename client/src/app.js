import { Component } from "react";
import axios from "axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

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
                    let { firstname, lastname, imageurl, bio } = data.userInfo;
                    this.setState({
                        first: firstname,
                        last: lastname,
                        imageUrl: imageurl,
                        bio: bio,
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
        return (
            <div>
                <div className="errorMessage">
                    {this.state.error && (
                        <h1 style={{ color: "red" }}>
                            Something went wrong with the provided information
                        </h1>
                    )}
                    <Logo />
                    <div onClick={this.toggleModal}>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                        />
                    </div>
                </div>
                <div className="up">
                    {this.state.imageUploaderIsVisible && (
                        <Uploader
                            className="uploader"
                            methodInApp={this.methodInApp}
                            toggleModal={this.toggleModal}
                        />
                    )}
                </div>
                <div className="profile">
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        bio={this.state.bio}
                        updateBioInApp={this.updateBioInApp}
                    />
                </div>
            </div>
        );
    }
}
