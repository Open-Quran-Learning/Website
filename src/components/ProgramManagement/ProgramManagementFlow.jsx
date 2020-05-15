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

  const [modalKey, setModalKey] = useState(0);

  const flowStops = [
    {
      title: "إنشاء برنامج جديد",
      content: <ProgramCreation />,
      canGoNext: () => true,
      action: () => console.debug("program"),
    },
    {
      title: "الكورسات",
      content: <CoursesListing programID={programID} />,
      canGoNext: () => true,
      action: () => console.debug("courses"),
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
      canGoNext: () => isQuizValid(program.assessmentQuiz),
      action: () => console.debug(program.assessmentQuiz),
    },
  ];

  const resetFlow = () => {
    updateProgram(emptyState);
    setModalKey(modalKey + 1);
    onFinish();
  };

  return (
    <FlowModal
      key={modalKey}
      isShown={isShown}
      flowStops={flowStops}
      onFinish={resetFlow}
      onCancel={resetFlow}
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
        minusDisabled={managePrograms.collection.length === 0}
      />
    </div>
  );
};
