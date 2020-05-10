import React from "react";
import ManageCourse from "./ManageCourse";
import ManageQuiz from "./ManageQuiz";
import "./CourseManagementFlow.scss";
import LessonManagementFlow from "./LessonManagementFlow";
import { userIsSure } from "./Utils/utils";
import ManageCollectionState from "./ManageCollectionState";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import { useState } from "react";
import { isCourseValid, isQuizValid } from "./Utils/validation";
import { FlowModal } from "../Shared/Flow/Flow";

//TODO: fetch lessons from API by courseID
const LessonsListing = React.memo(({ courseID }) => {
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
      {shouldManage ? (
        <LessonManagementFlow
          onFinish={() => setShouldManage(false)}
          lessonID={managedLessonID}
        />
      ) : (
        ""
      )}
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
});

const CourseManagementFlow = ({ courseID, onFinish }) => {
  const emptyState = {
    content: {},
    lessons: [],
    quiz: [],
  };

  const [course, updateCourse] = useState(emptyState); // replace with api data

  const canGoNext = (index) => {
    switch (index) {
      case 0:
        return isCourseValid(course.content);
      case 1:
        return true;
      case 2:
        return isQuizValid(course.quiz);
    }
  };

  const runBeforeNext = (index) => {
    switch (index) {
      case 0:
        console.debug(course.content); //TODO: replace with an api call
        break;
      case 2:
        console.debug(course.quiz); //TODO: replace with an api call
        break;
    }
  };

  const flowStops = [
    {
      title: "إنشاء كورس",
      content: (
        <ManageCourse
          {...course.content}
          update={(newCourse) =>
            updateCourse({ ...course, content: newCourse })
          }
        />
      ),
    },
    {
      title: "إضافة دروس",
      content: <LessonsListing courseID={courseID} lessons={course.lessons} />,
    },
    {
      title: "إنشاء كويز",
      content: (
        <ManageQuiz
          existingQuestions={course.quiz}
          update={(newQuiz) => {
            console.log(newQuiz);
            updateCourse({ ...course, quiz: newQuiz });
          }}
        />
      ),
    },
  ];

  return (
    <FlowModal
      runBeforeNext={runBeforeNext}
      canGoNext={canGoNext}
      flowStops={flowStops}
    />
  );
};

export default CourseManagementFlow;
