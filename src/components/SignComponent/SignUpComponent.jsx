import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpComponent extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            guardianname: '',
            phone: '',
            birthday: '',
            gender: '',
            street: '',
            city: '',
            state: '',
            Zip: '',
            country: '',

            hasAgreed: false
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
        
    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">اسم المستخدم</label>
                <input type="text" id="name" className="FormField__Input" placeholder="ادخل اسم المستخدم الخاص بك" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">اسم ولى الأمر</label>
                <input type="text" id="guardianname" className="FormField__Input" placeholder="ادخل اسم ولى الأمر" name="guardianname" value={this.state.guardianname} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">البريد الالكترونى</label>
                <input type="email" id="email" className="FormField__Input" placeholder="ادخل البريد الالكترونى الخاص بك" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">كلمة المرور</label>
                <input type="password" id="password" className="FormField__Input" placeholder="ادخل كلمة المرور الخاصة بك" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="tel">رقم الهاتف المحمول</label>
                <input type="tel" id="phone" className="FormField__Input" placeholder="ادخل رقم الهاتف المحمول الخاص بك" name="phone" value={this.state.phone} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">تاريخ الميلاد</label>
                <input id="bday"  type="date" className="FormField__Input" name="birthday" value={this.state.birthday} onChange={this.handleChange}/>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="GENDER">النوع</label>
                <input type='radio' id='male' checked='checked' name='gender' value="Male" onChange={this.handleChange}></input>
                <label for='male'>ذكر</label>
                <br></br>
                <input type='radio' id='female' name='gender' value="Female" onChange={this.handleChange}></input>
                <label for='female'>أنثى</label>
                        
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="address">العنوان</label>
                <input type="street" className="FormField__Input" id="street" placeholder="الشارع" name="street" value={this.state.street} onChange={this.handleChange}></input>
                <input type="city" className="FormField__Input" id="city" placeholder="المدينة" name="city" value={this.state.city} onChange={this.handleChange}></input>
                <input type="state" className="FormField__Input" id="state" placeholder="المحافظة" name="state" value={this.state.state} onChange={this.handleChange}></input>
                <input type="zip" className="FormField__Input" id="Zip" placeholder="الرقم البريدى" name="Zip" value={this.state.Zip} onChange={this.handleChange}></input >
                <input type="country" className="FormField__Input" id="country" placeholder="الدولة" name="country" value={this.state.country} onChange={this.handleChange}></input>
              </div>
              
              <div className="FormField">
                   <br></br>
                   <br></br>
                   <br></br>
                  <button className="FormField__Button mr-20">التسجيل</button> <Link to="/sign-in" className="FormField__Link">أنا عضو بالفعل</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpComponent;
