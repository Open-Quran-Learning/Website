import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  Badge,
  Row,
  Col,
  Container
} from "reactstrap";
import "./News.css";

class NewsComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container className="news_container" fluid={true}>
          <Card className="news_borders">
            <CardBody>
              <CardHeader className="news_header" tag="h4">
                احداث عظيمة حدثت فى مثل هذا اليوم
              </CardHeader>
              <Row>
                <Col xs="3">
                  <CardImg src="./assets/images/logo.png" />
                </Col>
                <Col xs="7">
                  <CardText className="news_details">
                    الاحداث العظيمة هتتكتب هنا على هيئة مقال رائع يجذب الانتباه
                    و كدا
                  </CardText>
                </Col>
              </Row>
              <CardFooter>
                <Badge color="success">tags</Badge>
              </CardFooter>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default NewsComponent;
