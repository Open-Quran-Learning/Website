import React, { Component } from 'react';
import "./ContactForm.css";


class ContactForm extends Component {
    state = { 
        topic: "",
        message: ""
     }
     
    handleListChange = (event) => {
        this.setState({topic: event.target.value})
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value})
    }

    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault()
    }

    render() { 
        return (  
            <React.Fragment>
                <div className="topic">
                    <label for="messageList" className="listHeader">موضوع الرسالة  </label>
                    <select id="messageList" className="messageList" onChange={this.handleListChange}>
                        <option value="برنامج">برنامج</option>
                        <option value="كورس">كورس</option>
                        <option value="درس">درس</option>
                        <option value="معلم">معلم</option>
                        <option value="أخرى">أخرى</option>
                    </select>
                </div>
                <br/>
                <br/>
                <hr/>
                <div className="messageBox"> 
                    <h3 for="userMessage">اكتب رسالتك هنا</h3>
                    <textarea id="userMessage" onChange={this.handleMessageChange} />
                </div>
                <br/>
                <div className="center">
                    <button className="btn btn-success sm m-2 submitButton" onClick={this.handleSubmit}>إرسال</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default ContactForm;