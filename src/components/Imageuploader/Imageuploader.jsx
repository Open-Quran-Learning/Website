import React from 'react';
import "./image.css";

class ImageUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' />;
        }
        return (
            <form>
                <div className="form-group preview" >
                    {imgPreview}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadSingleFile} />
                </div>
                <button type="button" className="form-control" onClick={this.upload}>Upload</button>
            </form >
        )
    }
}

  export default ImageUpload;