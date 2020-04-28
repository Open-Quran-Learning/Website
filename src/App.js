import React, { Component } from "react";
import "./App.css";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Home from "./components/HomeComponent/HomeComponent";
import ProgramDetails from "./components/programdetails/ProgramDetails";
import StudentProfilePage from "./components/StudentProfilePage/StudentProfilePage";
import Login from "./components/Login/LoginComponent";
import Registration from "./components/Login/RegistrationComponent";
import ImageUpload from "./components/Imageuploader/Imageuploader";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  HomePage = () => {
    return <Home />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/home" component={this.HomePage} />
            <Route path="/program" component={() => <ProgramDetails />} />
            <Route path="/student" component={() => <StudentProfilePage />} />
            <Route path="/Login" component={() => <Login />} />
            <Route path="/Registration" component={() => <Registration />} />
            <Route path="/Img" component={() => <ImageUpload />} />
           

            <Redirect to="/home" />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
