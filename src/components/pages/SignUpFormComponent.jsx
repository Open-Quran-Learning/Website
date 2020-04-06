import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
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
                <label className="FormField__Label" htmlFor="name">User Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your User Name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">GUARDIAN NAME</label>
                <input type="text" id="guardianname" className="FormField__Input" placeholder="Enter your GUARDIAN NAME" name="guardianname" value={this.state.guardianname} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="tel">MOBILE NUMBER</label>
                <input type="tel" id="phone" className="FormField__Input" placeholder="Enter your MOBILE NUMDER" name="phone" value={this.state.phone} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">DATE OF BIRTH</label>
                <input id="bday"  type="date" className="FormField__Input" name="birthday" value={this.state.birthday} onChange={this.handleChange}/>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="GENDER">GENDER</label>
                <input type='radio' id='male' checked='checked' name='gender' value="Male" onChange={this.handleChange}></input>
                <label for='male'>Male</label>
                <input type='radio' id='female' name='gender' value="Female" onChange={this.handleChange}></input>
                <label for='female'>Female</label>
                        
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="address">ADDRESS</label>
                <input type="street" className="FormField__Input" id="street" placeholder="Street" name="street" value={this.state.street} onChange={this.handleChange}></input>
                <input type="city" className="FormField__Input" id="city" placeholder="City" name="city" value={this.state.city} onChange={this.handleChange}></input>
                <input type="state" className="FormField__Input" id="state" placeholder="State" name="state" value={this.state.state} onChange={this.handleChange}></input>
                <input type="zip" className="FormField__Input" id="Zip" placeholder="Zip" name="Zip" value={this.state.Zip} onChange={this.handleChange}></input >
                <input type="country" className="FormField__Input" id="country" placeholder="Country" name="country" value={this.state.country} onChange={this.handleChange}></input>
              </div>
              
              <div className="FormField">
                   <br></br>
                   <br></br>
                   <br></br>
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
