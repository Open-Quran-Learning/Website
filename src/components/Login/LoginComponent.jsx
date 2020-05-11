import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import {
  setStorage,
  getStorage,
  removeStorage
} from "../../shared/LocalStorage";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      jobject: { email: "", password: "", action: "login" },
      api_state: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAPI = this.handleAPI.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    var obj = this.state.jobject;

    obj[name] = value;
    this.setState({
      jobject: obj
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state.jobject);

    axios
      .post("https://ayat-quran.herokuapp.com/v1/users", this.state.jobject)
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);

        if (res.status == "200")
          this.setState({
            api_state: "success"
          });
        else if (res.status == "403")
          this.setState({
            api_state: res.data.status
          });

        setStorage("token", res.data.token, 7);
        setStorage("name", res.data.name, 7);
        setStorage("profile_picture", res.data.profile_picture, 7);
        setStorage("public_id", res.data.public_id, 7);
        //console.log(getStorage("token"));
      })
      .catch(error => {
        console.error(error);
      });

    // sent a GET request
  }

  handleAPI() {
    if (this.state.api_state === "user is unauthorized")
      return (
        <div>
          <Alert color="success">
            {" "}
            تأكد من ادخال الحساب وكلمة المرور الصحيحين
          </Alert>
          <Redirect to="/login" />
        </div>
      );
    else if (this.state.api_state === "success")
      return (
        <div>
          <Redirect to="/home" />
        </div>
      );
    return "";
  }

  render() {
    return (
      <div className="Con">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>تسجيل الدخول</h3>

              <div className="form-group">
                <label>البريد الالكترونى</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="ادخل البريد الالكترونى الخاص بك"
                  name="email"
                  value={this.state.jobject.email}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="ادخل كلمة المرور الخاص بك"
                  name="password"
                  value={this.state.jobject.password}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                تسجيل الدخول
              </button>
            </form>
            <this.handleAPI />
          </div>
        </div>
      </div>
    );
  }
}
