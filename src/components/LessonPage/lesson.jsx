import React, { Component } from 'react';

class Lesson extends Component {
    state = {  

    }

    createVideo = (videoLink) => {
        return(
            <iframe src={videoLink}>

            </iframe>
        )
    }

    createReference = () => {

    }

    createArticle = (article) => {
        return(
        <p>{article}</p>
        )
    }


    render() { 
        let videoURL = this.props.content.video;
        let articleContent = this.props.content.article;
        return (
            <div>
                {
                    
                ( videoURL && videoURL != "")? 
                this.createVideo(videoURL) : <p>لا يوجد فيديو لهذا الدرس</p>
                }
                {
                (articleContent && articleContent != "")?
                this.createArticle(articleContent) : <p>لا يوجد مقال لهذا الدرس</p>
                }
                <button>
                    الرجوع إلى البرنامج
                </button>
                <button>
                    الدرس التالي
                </button>
                <button>
                    الدرس السابق
                </button>
            </div> 
         );
    }
}
 
export default Lesson;