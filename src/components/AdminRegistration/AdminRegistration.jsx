import React, { Component } from "react";
import "./login.css"
import axios from 'axios';


export default class AdminRegistration extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            birthday: '',
            gender: '',
            type:"STAFF",           
            action:"register"

            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    
    handleSubmit(e) {
        e.preventDefault();

        

        console.log('The form was submitted with the following data:');
        console.log(this.state);

      
            axios
            .post('https://ayat-quran.herokuapp.com/v1/users',this.state)
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            })

    }

    render() {
        
        return (
            <div className="Con">
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
                <h3>التسجيل لطاقم العمل</h3>

                <div className="form-group">
                    <label>اسم المستخدم</label>
                    <input type="text" id="name" className="form-control" placeholder="اسم المستخدم" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>

               

                <div className="form-group">
                    <label>البريد الالكترونى</label>
                    <input type="email" id="email" className="form-control" placeholder="ادخل البريد الالكترونى الخاص بك" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>كلمة المرور</label>
                    <input type="password" id="password" className="form-control" placeholder="ادخل كلمة المرور" name="password" value={this.state.password} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" id="phone" className="form-control" placeholder="ادخل رقم الهاتف الخاص بك" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>تاريخ الميلاد</label>
                    <input type="date" id="bday" className="form-control"  name="birthday" value={this.state.birthday} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>النوع</label>
                    <br></br> <br></br>
                    <input type="radio" id="male"   name="gender" value="Male" onChange={this.handleChange}/>
                    <label for='male'>ذكر</label>
                    <br></br>
                    <input type="radio" id="female"   name="gender" value="Female" onChange={this.handleChange}/>
                    <label for='male'>أنثى</label>
                </div>



                <button type="submit" className="btn btn-primary btn-block">التسجيل</button>

            </form>
            </div>
            </div>
            </div>
        );
    }
}