import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Badge,
  Progress
} from "reactstrap";
import "./previewStyle.css";

class ProgramPreview extends Component {
  state = {};
  render() {
    return (
      <div className="col-6 col-sm-2 m-3 programPreview">
        <Card style={{ width: "125%", height: "100%" }}>
          <CardBody>
            <CardImg width="100%" src="./assets/images/logo.png" />
            <CardHeader tag="h4">اسم البرنامج</CardHeader>
            <CardText>نبذة بسيطه مختصره رائعة عن الكورس</CardText>
            <Progress color="success" value="3" max="5" />
            <CardFooter>
              <Badge color="success">تعليمى</Badge>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ProgramPreview;
