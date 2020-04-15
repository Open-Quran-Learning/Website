import React, { Component } from 'react';
import "./style.css";

class Lesson extends Component {
    state = {  

    }

    createVideo = (videoLink) => {
        return(
            <iframe className="video" src={videoLink}>

            </iframe>
        )
    }

    createReference = (referencesData) => {
        return(
        referencesData.map((ref) => <a className="ref" href={ref.URL}>{ref.name} <br/><hr className="refHR"/></a>)
        )
    }

    createArticle = (article) => {
        return(
        <p className="article">{article}</p>
        )
    }


    render() { 
        let videoURL = this.props.content.video;
        let articleContent = this.props.content.article;
        let references = this.props.content.references;
        return (
            <div>
                <h2 className="lessonName">{this.props.content.name}</h2>
                <hr/>
                <div>
                    <div className="sideBarLessons">
                    <h2 className="sideBarHead">الدروس</h2>
                    <ul>
                        <li><a className="lessonRef" href="#">الدرس الأول</a></li>
                        <hr/>
                        <li><a className="lessonRef" href="#">الدرس الثاني</a></li>
                        <hr/>
                        <li><a className="lessonRef" href="#">الدرس الثالث</a></li>
                        <hr/>
                        <li><a className="lessonRef" href="#">الدرس الرابع</a></li>
                    </ul>
                    
                    </div>
                   
                </div>
                {
                    ( videoURL && videoURL != "")? 
                    this.createVideo(videoURL) : <p>لا يوجد فيديو لهذا الدرس</p>
                }

                <div className="buttons">
                <button className="btn btn-success sm m-2">
                        الدرس التالي 
                </button>
                <button className="btn btn-success sm m-2">
                    الدرس السابق
                </button>
                <button className="btn btn-primary sm m-2">
                   الرجوع إلى الكورس
                </button>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                {
                    (articleContent && articleContent != "")?
                    this.createArticle(articleContent) : <p className="noData">لا يوجد مقال لهذا الدرس</p>
                }

                {
                    (references && references != null)?
                    this.createReference(references) : <p className="noData">لا يوجد مصادر لهذا الدرس</p>
                }
                
            </div> 
            
         );
    }
}
 
export default Lesson;