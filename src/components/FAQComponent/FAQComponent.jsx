import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "./FAQStyle.css";

class FAQComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="faq_component">
        <Button className="faq_button" onClick={this.toggle}>
          لماذا نحن هنااااااااااا ؟
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <Card>
            <CardBody className="faq_answer">
              سؤال صعب ... سؤال صعب, سؤال يرااودنيييي
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default FAQComponent;
