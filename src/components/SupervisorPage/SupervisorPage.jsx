import React, { Component } from "react";
import { getUserData } from "../../shared/LocalStorage";
import { ProgramsListing } from "../ProgramManagement/ProgramManagementFlow";
import "./SupervisorPage.css";
class SupervisorPage extends Component {
  // constructor() {
  //   super();
  //   this.userdata = getUserData();
  // }

  render() {
    this.state = {
      userdata: getUserData(),
    };
    return (
      <div>
        <div className="profile">
          <div className="image">
            <img src="./assets/images/logo.png" alt="profile picture" />
          </div>
          <div className="info">
            <h2>{this.state.userdata.name}</h2>
          </div>
        </div>
        <div className="profile">
          <ProgramsListing />
        </div>
      </div>
    );
  }
}

export default SupervisorPage;
