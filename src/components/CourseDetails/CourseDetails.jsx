import React, { Component } from "react";
import "./CourseDetails.css";
class CourseDetails extends Component {
  render() {
    const { items } = this.props;
    const theItems = items.map((item) => {
      return (
        <div className="course">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <button>الدخول الي الدرس</button>
        </div>
      );
    });
    return (
      <div>
        <div className="header">
          <h2>{this.props.name}</h2>
        </div>
        <div className="container">{theItems}</div>
      </div>
    );
  }
}

export default CourseDetails;
