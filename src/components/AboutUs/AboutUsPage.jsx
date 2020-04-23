import React, { Component } from "react";
import { Jumbotron, Container } from "reactstrap";
import "./AboutUs.css";

class AboutUsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Container className="aboutus">
            <h1>من نحن؟</h1>
            <p>كلام بقا بيقولك احنا مين وبنعمل ايه والى اخره</p>
          </Container>
        </Jumbotron>
        <Jumbotron>
          <Container className="aboutus">
            <h1>مهام والتزامات</h1>
            <p>
              هنا كلام عن ليه تم تأسيس مركز ايات والويب سايت الرائع هيعمل ايه في
              سبيل تحقيق الغاية دى
            </p>
          </Container>
        </Jumbotron>
        <Jumbotron>
          <Container className="aboutus">
            <h1>اماكن تواجدنا</h1>
            <p>عنواين مراكز آيات فى جميع انحاء العالم ودمنهور</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default AboutUsComponent;
