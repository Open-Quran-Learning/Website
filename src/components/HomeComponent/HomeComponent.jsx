import React from "react";
import { Jumbotron, Button } from "reactstrap";
import "./HomeComponent.css";
import ProgramPreview from "../ProgramPreview/ProgramPreview";

function Home(props) {
  return (
    <div className=" HomeComponent">
      <div className="container">
        <Jumbotron>
          <h1 className="display-3 ">محتوى جديد</h1>
          <p className="lead ">
            This is a simple hero unit, a simple Jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-2 " />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead ">
            <Button color="success">Learn More</Button>{" "}
          </p>
        </Jumbotron>
      </div>

      <div className="row">
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
        <ProgramPreview />
      </div>
    </div>
  );
}

export default Home;
