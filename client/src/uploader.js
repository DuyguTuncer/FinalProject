import { Component } from "react";
import axios from "axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.userFileSelection = this.userFileSelection.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.closeUploader = this.closeUploader.bind(this);

        console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        console.log("Uploader mounted!!!");
    }

    uploadImage() {
        var file = this.file;
        var formData = new FormData();
        formData.append("file", file);
        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("response:", response);
                console.log("axios upload email:", response.data.imgUrl);
                this.props.methodInApp(response.data.imgUrl);
            })
            .catch((err) => {
                console.log("error in upload image axios", err);
            });
    }

    closeUploader() {
        this.props.toggleModal();
    }

    userFileSelection(e) {
        this.file = e.target.files[0];
    }

    render() {
        return (
            <div className="imageUploader">
                <p className="XButton" onClick={this.closeUploader}>
                    X
                </p>
                <h2>Change Your Profile Picture</h2>
                <h4>Click upload button to change your profile picture</h4>
                <input
                    className="inputFile"
                    type="file"
                    onChange={this.userFileSelection}
                />

                <button className="uploadButton" onClick={this.uploadImage}>
                    Upload
                </button>
            </div>
        );
    }
}
