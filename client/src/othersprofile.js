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
                <img
                    className="profilePic"
                    src={this.state.imageurl}
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
