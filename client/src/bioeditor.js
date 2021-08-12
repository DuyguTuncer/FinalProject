import { Component } from "react";
import axios from "axios";

export default class BioEditior extends Component {
    constructor() {
        super();
        this.state = {
            editorVisible: false,
            draftBio: "",
        };
        this.textareaToggle = this.textareaToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    updateBio() {
        //   Make a post request after dealling with server
    }

    textareaToggle() {
        this.setState({ editorVisible: !this.state.editorVisible });
    }

    handleChange({ target }) {
        console.log("HANDLE CHANGE IN BIO.js", target);
        console.log("[target.name]:target.value}", {
            [target.name]: target.value,
        });
        this.setState({ [target.name]: target.value });
        console.log("this state after target.value:", this.state);
    }

    render() {
        return (
            <div>
                <p>{this.draftBio}</p>
                {this.state.editorVisible && (
                    <div>
                        <textarea name="bio" onChange={this.handleChange} />
                        {/* Make a post request after dealling with server */}
                        <button onClick={this.updateBio}>Submit</button>
                    </div>
                )}
                {!this.state.editorVisible && (
                    <button onClick={this.textareaToggle}>Update Bio</button>
                )}
            </div>
        );
    }
}
