import React, { useState, Fragment } from "react";
import "./ProgramManagementFlow.scss";

import ManageCourse from "./ManageCourse";
import ManageQuiz from "./ManageQuiz";
import ManageLessons from "./ManageLessons";
import { ControlledFlow } from "../Shared/Flow/Flow";

const ProgramManagementFlow = () => {
  const stopsInTheFlow = [
    () => <ManageCourse update={(course) => console.log(course)} />,
    () => <ManageLessons update={(lessons) => console.log(lessons)} />,
    () => <ManageQuiz update={(quiz) => console.log(quiz)} />,
  ];
  return <ControlledFlow flowStops={stopsInTheFlow} />;
};

export default ProgramManagementFlow;
