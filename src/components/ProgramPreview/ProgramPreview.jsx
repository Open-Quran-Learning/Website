import React, { Component } from 'react';
import "./previewStyle.css"

class ProgramPreview extends Component {
    state = {  }
    render() { 
        return (
            <div className="programPreview">
                <img className="col-1 float-right" src="./assets/images/logo.png"></img>
                <label fo="programPreview">برنامج تاج الكرامة</label>
                <p type="text" id="programPreview"> .(100%) وصف صغير عن البرنامج , و نسبة المحتوى التي تم اجتيازها</p>
            </div>
          );
    }
}
 
export default ProgramPreview;