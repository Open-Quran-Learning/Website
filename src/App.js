import React, { Component } from "react";
import "./App.css";
import Home from "./components/HomeComponent/HomeComponent";
import ProgramDetails from "./components/programdetails/ProgramDetails";
import StudentProfilePage from "./components/StudentProfilePage/StudentProfilePage";
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
          <div className="holyGrail">
            <header>
              <img
                src="./assets/images/logo.png"
                height="98"
                width="auto"
                alt="logo"
              />
              <h1>مركز آيات لتعليم القرآن الكريم</h1>
            </header>
            <main>
              <Switch>
                <Route path="/home" component={this.HomePage} />
                <Route path="/program" component={() => <ProgramDetails />} />
                <Route path="/student" component={() => <StudentProfilePage />} />

                <Redirect to="/home" />
              </Switch>
            </main>
            <nav>
              <div></div>
            </nav>
            <aside></aside>
            <footer>
              <div>
                <span> Copyright &copy; 2020 Ayat </span>
                <ul>
                  <li>
                    <i className="fa fa-facebook fa-lg"></i>
                  </li>
                  <li>
                    <i className="fa fa-youtube fa-lg"></i>
                  </li>
                  <li>
                    <i className="fa fa-twitter fa-lg"></i>
                  </li>
                </ul>
              </div>
            </footer>
          </div>


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
