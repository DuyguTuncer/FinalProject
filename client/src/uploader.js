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
            .then(({ data }) => {
                console.log("axios upload email:", data.imgUrl);
                this.props.methodInApp(data.imgUrl);
            })
            .catch((err) => {
                console.log("", err);
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
                <h1>Change Your Profile Picture</h1>
                <h4>Click upload button to change your profile picture</h4>
                <input
                    type="file"
                    onChange={this.userFileSelection}
                    className="fileInput"
                />
                <button className="uploadButton" onClick={this.uploadImage}>
                    Upload
                </button>
            </div>
        );
    }
}
