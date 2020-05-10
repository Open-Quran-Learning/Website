import React, { useState } from "react";
import "./ProgramManagementFlow.scss";

import ManageQuiz from "./ManageQuiz";
import { ManageLesson } from "./ManageLessons";
import { FlowModal } from "../Shared/Flow/Flow";
import { isQuizValid, isLessonValid } from "./Utils/validation";

const LessonManagementFlow = ({ lessonID, onFinish }) => {
  const newLesson =
    lessonID === undefined || lessonID === null || lessonID === "";

  const emptyState = {
    content: {},
    quiz: [],
  };
  const [lesson, updateLesson] = useState(emptyState); // replace with api data

  const canGoNext = (index) => {
    switch (index) {
      case 0:
        return isLessonValid(lesson.content);
      case 1:
        return isQuizValid(lesson.quiz);
    }
  };

  const runBeforeNext = (index) => {
    switch (index) {
      case 0:
        console.debug(lesson.content); //TODO: replace with an api call
        break;
      case 1:
        console.debug(lesson.quiz); //TODO: replace with an api call
        break;
    }
  };

  const flowStops = [
    {
      title: "إنشاء درس",
      content: (
        <ManageLesson
          {...lesson.content}
          update={(newLesson) =>
            updateLesson({ ...lesson, content: newLesson })
          }
        />
      ),
    },
    {
      title: "إنشاء كويز",
      content: (
        <ManageQuiz
          existingQuestions={lesson.quiz}
          update={(newQuiz) => {
            console.log(newQuiz);

            updateLesson({ ...lesson, quiz: newQuiz });
          }}
        />
      ),
    },
  ];

  return (
    <FlowModal
      runBeforeNext={runBeforeNext}
      canGoNext={canGoNext}
      isShown={true}
      flowStops={flowStops}
      onFinish={onFinish}
      onCancel={onFinish}
    />
  );
};

export default LessonManagementFlow;
