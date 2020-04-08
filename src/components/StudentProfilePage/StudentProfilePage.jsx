import React, { Component } from 'react';
import "./style.css";

class StudentProfilePage extends Component {
    state = {  }
    render() { 
        return ( 
                <div className="studentPage">
                    <img className="studentImage" src="./assets/images/male.png" className="rounded-circle border border-success"/>
            <h2 class="studentName">يوسف خالد يوسف</h2>
            <br/>
            <br/>
            <h4> تاريخ الميلاد : ١٩٩٨/١/٢١ </h4>
            <br/>
            <br/>
            <h4>yossef.k.y333@gmail.com : البريد الالكتروني</h4>
            <br/>
            <br/>
            <select placeholder="choose" id="coursesInProgress">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <label for="coursesInProgress"> : البرامج التي تم التسجيل فيها</label>
            <br/>
            <br/>
            <select id="savedCourses">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <label for="savesCourses"> : البرامج المسجلة لوقت لاحق</label>
                </div>        
         );
    }
}
 
export default StudentProfilePage;