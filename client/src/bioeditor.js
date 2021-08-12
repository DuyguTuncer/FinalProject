import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
        };
        this.textareaToggle = this.textareaToggle.bind(this);
    }

    textareaToggle() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }

    functionToUpdateDatabaseWithNewBio() {
        // Here you will want to make a post request to the server.
        // You will update the value of the bio in the DB with the new one.
        // Once successful, you can call a function passed down from App
        // to update the value in App
    }

    render() {
        return (
            <div>
                BIO EDITOR
                {this.state.editorIsVisible && <textarea />}
                <button onClick={this.textareaToggle}>Click Me!</button>
            </div>
        );
    }
}
