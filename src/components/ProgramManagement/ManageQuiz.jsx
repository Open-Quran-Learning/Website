import React from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import ManageCollectionState from "./ManageCollectionState";
import "./ManageQuiz.scss";

//TODO fetch quiz data via api
const ManageQuiz = React.memo(({ existingQuestions, update }) => {
  const manageQuizzes = new ManageCollectionState([
    existingQuestions || [],
    update,
  ]);

  return (
    <div className="manageQuiz">
      <label>الأسئلة</label>
      <ul>
        {manageQuizzes.collection.map((q, i) => {
          return (
            <ManageQuestion
              key={i}
              content={q}
              updateContent={(question) => manageQuizzes.updateOne(question, i)}
            />
          );
        })}
      </ul>
      <PlusMinusButtons
        onPlus={() => {
          manageQuizzes.addOne({
            questionTitle: "",
            order: manageQuizzes.collection.length,
            type: "WRITTEN",
            fullMark: 0,
          });
        }}
        onMinus={() => {
          manageQuizzes.removeLast();
        }}
        minusDisabled={manageQuizzes.collection.length == 0}
      />
    </div>
  );
});

const ManageQuestion = React.memo(({ content, updateContent }) => {
  return (
    <li className="manageQuestion">
      <input
        className="questionTitleInput form-control"
        type="text"
        placeholder={"السؤال"}
        value={content.questionTitle}
        onChange={(e) => {
          updateContent({ ...content, questionTitle: e.target.value });
        }}
      />
      <label className="mcqLabel">
        <input
          type="checkbox"
          checked={content.type === "MCQ"}
          onChange={(e) =>
            updateContent({
              ...content,
              type: e.target.checked ? "MCQ" : "WRITTEN",
              answers: content.type === "MCQ" ? content.answers : [],
            })
          }
        />
        اختيار متعدد
      </label>
      {content.type === "MCQ" ? (
        <ManageMCQAnswers
          answers={content.answers}
          update={(answers) => updateContent({ ...content, answers: answers })}
        />
      ) : (
        ""
      )}
    </li>
  );
});

const ManageMCQAnswers = React.memo(({ answers, update }) => {
  const manageAnswers = new ManageCollectionState([answers || [], update]);

  return (
    <>
      <ul>
        {manageAnswers.collection.map((a, i) => {
          return (
            <li key={i}>
              <input
                className="answerInput form-control"
                type="text"
                placeholder={"اجابة"}
                value={a.answerText}
                onInput={(e) => {
                  manageAnswers.updateOne(
                    {
                      ...manageAnswers.collection[i],
                      answerText: e.target.value,
                    },
                    i
                  );
                }}
              />
              <label className="correctAnswerLabel">
                <input
                  type="checkbox"
                  checked={a.isCorrect}
                  onChange={(e) =>
                    manageAnswers.updateOne(
                      {
                        ...manageAnswers.collection[i],
                        isCorrect: e.target.checked,
                      },
                      i
                    )
                  }
                />
                {"إجابة صحيحة"}
              </label>
            </li>
          );
        })}
      </ul>
      <PlusMinusButtons
        onPlus={() => {
          manageAnswers.addOne({
            answerText: "",
            isCorrect: false,
          });
        }}
        onMinus={() => {
          manageAnswers.removeLast();
        }}
        minusDisabled={manageAnswers.collection.length == 0}
      />
    </>
  );
});

export default ManageQuiz;
