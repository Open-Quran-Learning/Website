import React, { useState } from "react";
import "./LessonManagementFlow.scss";

import ManageQuiz from "./ManageQuiz";
import { ManageLesson } from "./ManageLessons";
import { FlowModal } from "../Shared/Flow/Flow";
import { isQuizValid, isLessonValid } from "./Utils/validation";
import ManageCollectionState from "./ManageCollectionState";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import { userIsSure } from "./Utils/utils";

export const LessonManagementFlow = ({ lessonID, isShown, onFinish }) => {
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
            updateLesson({ ...lesson, quiz: newQuiz });
          }}
        />
      ),
    },
  ];

  return (
    <FlowModal
      isShown={isShown}
      runBeforeNext={runBeforeNext}
      canGoNext={canGoNext}
      flowStops={flowStops}
      onFinish={onFinish}
      onCancel={onFinish}
    />
  );
};

//TODO: fetch lessons from API by courseID
export const LessonsListing = ({ courseID }) => {
  const manageLessons = new ManageCollectionState(
    useState([{ title: "ما لا يسع المسلم جهله" }])
  );

  const [managedLessonID, setManagedLessonID] = useState(undefined);
  const [shouldManage, setShouldManage] = useState(false);

  return (
    <div className="lessonsListing">
      <ul>
        {manageLessons.collection.map((l, i) => {
          return (
            <li key={i}>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  setManagedLessonID(l.id);
                  setShouldManage(true);
                }}
              >
                {`${i + 1} – ${l.title}`}
              </button>
            </li>
          );
        })}
      </ul>
      <LessonManagementFlow
        isShown={shouldManage}
        onFinish={() => setShouldManage(false)}
        lessonID={managedLessonID}
      />

      <PlusMinusButtons
        onPlus={() => {
          setManagedLessonID(undefined); // new lesson.
          setShouldManage(true);
        }}
        onMinus={() => {
          if (userIsSure()) manageLessons.removeLast();
        }}
        minusDisabled={manageLessons.collection.length == 0}
      />
    </div>
  );
};
