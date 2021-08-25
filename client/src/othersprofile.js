import { Component } from "react";
import axios from "axios";
import FriendButton from "./friendbutton";

export default class OthersProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            first: "",
            last: "",
            imageUrl: "",
            bio: "",
            id: null,
        };
        console.log("props: ", props);
    }

    //try asnc await here
    componentDidMount() {
        console.log("othersProfile mounted");
        console.log("this.props.match", this.props.match);
        let othersId = this.props.match.params.id;
        console.log("this.props.match.params.id: ", othersId);

        axios
            .get(`/api/user/${othersId}`)
            .then(({ data }) => {
                console.log("data in user: ", data);
                this.setState(data);
            })
            .catch((err) => console.log("err in /user: ", err));
    }

    render() {
        return (
            <div className="othersProfile">
                <div>
                    <img
                        className="othersProfilePic"
                        src={this.state.imageurl}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                </div>
                <div className="othersProfileFeatures">
                    <div>
                        <h2 className="othersH2">
                            {this.state.first} {this.state.last}
                        </h2>
                        <p className="othersP">Bio: {this.state.bio}</p>
                    </div>
                    <FriendButton
                        friendsId={this.props.match.params.id}
                    />
                </div>
            </div>
        );
    }
}
