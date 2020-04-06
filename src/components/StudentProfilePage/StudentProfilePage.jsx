import React, { Component } from 'react';

class StudentProfilePage extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <img src/>
            <h2>Name: User Name</h2>
            <h4>BirthDay: dd/mm/yyyy</h4>
            <h4>AAAAA@gmail.com</h4>
            <label for="coursesInProgress">Courses in progress : </label>
            <select id="coursesInProgress">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <br/>
            <label for="savesCourses">Saved courses: </label>
            <select id="savedCourses">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            </React.Fragment>
            
         );
    }
}
 
export default StudentProfilePage;