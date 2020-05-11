import React from "react";
import ManageCourse from "./ManageCourse";
import ManageQuiz from "./ManageQuiz";
import "./CourseManagementFlow.scss";
import { userIsSure } from "./Utils/utils";
import ManageCollectionState from "./ManageCollectionState";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import { useState } from "react";
import { isCourseValid, isQuizValid } from "./Utils/validation";
import { FlowModal } from "../Shared/Flow/Flow";
import { LessonsListing } from "./LessonManagementFlow";

export const CourseManagementFlow = ({ courseID, isShown, onFinish }) => {
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
            updateCourse({ ...course, quiz: newQuiz });
          }}
        />
      ),
    },
  ];

  return (
    <FlowModal
      flowStops={flowStops}
      isShown={isShown}
      canGoNext={canGoNext}
      runBeforeNext={runBeforeNext}
      onFinish={onFinish}
      onCancel={onFinish}
    />
  );
};

//TODO: fetch courses from API by courseID
export const CoursesListing = ({ programID }) => {
  const manageCourses = new ManageCollectionState(
    useState([{ title: "كورس في الجدعنة" }])
  );

  const [managedCourseID, setManagedCourseID] = useState(undefined);
  const [shouldManage, setShouldManage] = useState(false);

  return (
    <div className="coursesListing">
      <ul>
        {manageCourses.collection.map((c, i) => {
          return (
            <li key={i}>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  setManagedCourseID(c.id);
                  setShouldManage(true);
                }}
              >
                {`${i + 1} – ${c.title}`}
              </button>
            </li>
          );
        })}
      </ul>
      <CourseManagementFlow
        courseID={managedCourseID}
        isShown={shouldManage}
        onFinish={() => setShouldManage(false)}
      />

      <PlusMinusButtons
        onPlus={() => {
          setManagedCourseID(undefined); // new lesson.
          setShouldManage(true);
        }}
        onMinus={() => {
          if (userIsSure()) manageCourses.removeLast();
        }}
        minusDisabled={manageCourses.collection.length == 0}
      />
    </div>
  );
};
