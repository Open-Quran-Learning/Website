import React, { Component } from "react";
import "./App.css";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Home from "./components/HomeComponent";
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
            <Redirect to="/home" />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
