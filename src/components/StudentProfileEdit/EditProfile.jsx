import React, { Component } from "react";
import axios from "axios";
import "./EditProfile.css";

class EditProfile extends Component {
  /*   state = {
    email: this.props.email
  }; */

  constructor(props) {
    super(props);
    this.state = {
      email: "sadsadsa",
      country: "egypt",
      phone: "61111",
      birth_date: "date",
      password: "464468",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      phone: this.state.phone,
      birth_date: this.state.birth_date,
      password: this.state.password,
    };
    axios
      .put("https://reqres.in/api/users/5", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //start Change Handler
  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  phoneChangeHandler = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  birth_dateChangeHandler = (event) => {
    this.setState({
      birth_date: event.target.value,
    });
  };
  // end Change Handler
  render() {
    return (
      <div className="editContainer">
        <h2>صفحة تعديل البيانات</h2>
        <div className="editor">
          <form className="formEdit" onSubmit={this.submitHandler}>
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder={this.state.email}
              onChange={this.emailChangeHandler}
            />
            <label>رقم الهاتف</label>

            <input
              type="tel"
              onChange={this.phoneChangeHandler}
              placeholder={this.state.phone}
            />
            <label>كلمة السر</label>

            <input
              type="password"
              onChange={this.passwordChangeHandler}
              placeholder={this.state.password}
            />
            <label>تاريخ الميلاد</label>

            <input
              type="date"
              onChange={this.birth_dateChangeHandler}
              placeholder={this.state.password}
            />
            <input type="submit" value="تأكيد البيانات" />
            <input type="submit" value="الرجوع" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
