import React, { Component } from "react";

class CourseDetails extends Component {
  render() {
    const { items } = this.props;
    const theItems = items.map((item) => {
      return (
        <div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      );
    });
    return <div>{theItems}</div>;
  }
}

export default CourseDetails;
