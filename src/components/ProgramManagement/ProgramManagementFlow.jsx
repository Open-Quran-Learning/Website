import React from "react";
import "./ProgramManagementFlow.scss";

import ManageQuiz from "./ManageQuiz";
import { FlowModal } from "../Shared/Flow/Flow";
import ProgramCreation from "../ProgramCreation/ProgramCreation";
import { useState } from "react";
import { isQuizValid } from "./Utils/validation";
import { CoursesListing } from "./CourseManagementFlow";
import ManageCollectionState from "./ManageCollectionState";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import { userIsSure } from "./Utils/utils";

export const ProgramManagementFlow = ({ programID, isShown, onFinish }) => {
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
          existingQuestions={program.assessmentQuiz}
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

//TODO: fetch programs from API by userID
export const ProgramsListing = ({ userID }) => {
  const managePrograms = new ManageCollectionState(
    useState([{ title: "برنامج تاج الكرامة" }])
  );

  const [managedProgramID, setManagedProgramID] = useState(undefined);
  const [shouldManage, setShouldManage] = useState(false);

  return (
    <div className="programsListing">
      <ul>
        {managePrograms.collection.map((p, i) => {
          return (
            <li key={i}>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => {
                  setManagedProgramID(p.id);
                  setShouldManage(true);
                }}
              >
                {`${i + 1} – ${p.title}`}
              </button>
            </li>
          );
        })}
      </ul>
      <ProgramManagementFlow
        programID={managedProgramID}
        isShown={shouldManage}
        onFinish={() => setShouldManage(false)}
      />

      <PlusMinusButtons
        onPlus={() => {
          setManagedProgramID(undefined); // new lesson.
          setShouldManage(true);
        }}
        onMinus={() => {
          if (userIsSure()) managePrograms.removeLast();
        }}
        minusDisabled={managePrograms.collection.length == 0}
      />
    </div>
  );
};
