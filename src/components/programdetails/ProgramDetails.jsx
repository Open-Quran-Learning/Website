import React from "react";
import "./RrogramDetails.css";

function ProgramDetails(props) {
  return (
    <div>
      {/* //start header */}
      <div className="header">
        <div className="slide">
          <div className="container">
            <div className="intro">
              <h2>Program Name</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining
              </p>
              <button>Enroll Now</button>
            </div>
          </div>
        </div>
        <div class="navbar">
          <div class="container">
            <span></span>
            <ul>
              <li>
                <a href="#details">Details</a>
              </li>
              <li>
                <a href="#content">Content</a>
              </li>
              <li>
                <a href="#plan">Plan</a>
              </li>
              <li>
                <a href="#feedback">Feedback</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* // end header start program details// */}

      <div className="details" id="details">
        <div className="container">
          <div className="details_intro">
            <h2>Program Details</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </p>
          </div>
        </div>
      </div>

      {/* //end program details //start program content */}
      <div className="content" id="content">
        <div className="container">
          <div className="content_intro">
            <h2>Program Content</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </p>
          </div>
        </div>
      </div>

      {/*program plan*/}
      <div className="plan" id="plan">
        <div className="container">
          <div className="plan_intro">
            <h2>Program Plan</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;
