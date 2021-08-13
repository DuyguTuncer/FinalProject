import { Component } from "react";
import axios from "axios";

export default class BioEditior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorVisible: false,
            draftBio: "",
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateBio = this.updateBio.bind(this);
        console.log("logging props in bioeditor", props);
    }

    updateBio() {
        console.log("axios post updateBio: ", this.state);
        axios
            .post("/updatebio", this.state)
            .then(({ data }) => {
                console.log(
                    "bioeditor.js in post request /updatebio data:",
                    data.bio
                );

                // do we need to do location.reload?
                this.props.updateBioInApp(data.bio); // look at here
                this.textareaToggle();
            })
            .catch((err) => {
                console.log(
                    "error in bioeditor.js in post request /updatebio:",
                    err
                );
            });
    }

    textareaToggle() {
        this.setState({
            editorVisible: !this.state.editorVisible,
            draftBio: this.props.bio,
        });
    }

    handleChange({ target }) {
        this.setState({ draftBio: target.value });
    }

    render() {
        return (
            <div>
                <p>{this.props.bio}</p>
                {this.state.editorVisible && (
                    <div>
                        <textarea name="bio" onChange={this.handleChange} />
                        {/* Make a post request after dealling with server */}
                        <button onClick={this.updateBio}>Save</button>
                    </div>
                )}
                {!this.state.editorVisible && (
                    <button onClick={this.textareaToggle}>Update Bio</button>
                )}
            </div>
        );
    }
}
