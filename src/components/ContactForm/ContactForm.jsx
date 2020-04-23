import React, { Component } from 'react';
import "./ContactForm.css";


class ContactForm extends Component {
    state = { 
        topic: "برنامج",
        email: "",
        message: ""
     }
     
    handleListChange = (event) => {
        this.setState({topic: event.target.value})
    }

    handleMailChange = (event) => {
        this.setState({email: event.target.value})
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value})
    }

    handleSubmit = (event) => {
        let msg = {
            topic: "",
            email: "",
            message: ""
        }
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        expression.test(String(this.state.email).toLowerCase()) ? window.alert(
        "هل تريد أن ترسل هذه الرسالة ؟",
        [
            {
                text: "أجل",
                onPress: () => { msg.topic = this.state.topic
                    msg.topic = this.state.topic
                    msg.topic = this.state.topic
                    console.log(msg)
                    this.setState ({ 
                        topic: "برنامج",
                        email: "",
                        message: ""
                     })
                }
            },
            {
                text: "لا",
                onPress: () => ""
            }
        ]
         )  
        :window.alert("أعد كتابة بريدك الإلكتروني") 
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
                <div className="emailForm">
                    <label className="enterMail" for="userMail">ادخل بريدك الإلكتروني</label>
                    <input id="userMail" type="Email" onChange={this.handleMailChange} placeholder="ادخل بريدك الإلكتروني"></input>
                </div>
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