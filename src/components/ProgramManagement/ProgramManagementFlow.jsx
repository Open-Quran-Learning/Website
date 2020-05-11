import React from "react";
import "./ProgramManagementFlow.scss";

import ManageQuiz from "./ManageQuiz";
import { FlowModal } from "../Shared/Flow/Flow";
import ProgramCreation from "../ProgramCreation/ProgramCreation";
import CourseManagementFlow from "./CourseManagementFlow";
import ManageCollectionState from "./ManageCollectionState";
import { useState } from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import { userIsSure } from "./Utils/utils";
import { isQuizValid } from "./Utils/validation";

//TODO: fetch courses from API by courseID
const CoursesListing = React.memo(({ programID }) => {
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
});

const ProgramManagementFlow = ({ programID, isShown, onFinish }) => {
  const emptyState = {
    assessmentQuiz: [],
  };

  const [program, updateProgram] = useState(emptyState); // replace with api data

  const canGoNext = (index) => {
    switch (index) {
      case 0:
        return true; //TODO: handle program creation
      case 1:
        return true;
      case 2:
        return isQuizValid(program.assessmentQuiz);
    }
  };

  const runBeforeNext = (index) => {
    switch (index) {
      case 0:
        console.debug("program"); //TODO: replace with an api call
        break;
      case 1:
        console.debug("courses"); //TODO: replace with an api call
        break;
      case 2:
        console.debug(program.quiz); //TODO: replace with an api call
        break;
    }
  };

  const flowStops = [
    {
      title: "إنشاء برنامج جديد",
      content: <ProgramCreation />,
    },
    {
      title: "الكورسات",
      content: <CoursesListing programID={programID} />,
    },
    {
      title: "امتحان القبول",
      content: (
        <ManageQuiz
          existingQuestions={program.quiz}
          update={(newQuiz) => {
            updateProgram({ ...program, assessmentQuiz: newQuiz });
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

export default ProgramManagementFlow;
