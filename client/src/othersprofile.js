import { Component } from "react";
import axios from "axios";

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
       
    }

    render() {
        return (
            <div className="othersProfile">
                <img
                    className="profilePic"
                    src={this.state.imageUrl}
                    alt={`${this.state.first} ${this.state.last}`}
                />
                <div>
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                    <p>
                        Here is my bio:
                        {this.state.bio}
                    </p>
                </div>
            </div>
        );
    }
}
