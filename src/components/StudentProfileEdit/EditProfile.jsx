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
      currentpassword: "123456",
      newpassword: "",
      newpasswordconfirm: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      phone: this.state.phone,
      birth_date: this.state.birth_date,
      currentpassword: this.state.currentpassword,
      newpassword: this.state.newpassword,
      newpasswordconfirm: this.state.newpasswordconfirm,
    };

    if (this.state.newpassword !== this.state.newpasswordconfirm) {
      alert("Passwords don't match");
    }

    axios
      .put("https://reqres.in/api/users/5", data)
      .then((res) => console.debug(res))
      .catch((err) => console.debug(err));
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
  oldpasswordChangeHandler = (event) => {
    this.setState({
      oldpassword: event.target.value,
    });
  };
  newpasswordChangeHandler = (event) => {
    this.setState({
      newpassword: event.target.value,
    });
  };
  new2passwordChangeHandler = (event) => {
    this.setState({
      newpasswordconfirm: event.target.value,
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
            <label>كلمة السر القديمة</label>
            <input
              type="password"
              onChange={this.oldpasswordChangeHandler}
              required
            />
            <label>كلمة السر الجديدة</label>
            <input
              type="password"
              onChange={this.newpasswordChangeHandler}
              required
            />
            <label>تأكيد كلمة السر الجديدة</label>
            <input
              type="password"
              onChange={this.new2passwordChangeHandler}
              required
            />
            <label>تاريخ الميلاد</label>
            <input
              type="date"
              onChange={this.birth_dateChangeHandler}
              placeholder={this.state.password}
              required
            />
            <input type="submit" value="تأكيد البيانات" />
            <input type="button" value="الرجوع" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
