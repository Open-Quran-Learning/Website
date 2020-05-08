import React, { useState, useEffect, Fragment } from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import ManageCollectionState from "./ManageCollectionState";
import "./ManageQuiz.scss";

//TODO fetch quiz data via api
const ManageQuiz = ({ existingQuestions, update }) => {
  const [questions, updateQuestions] = useState(
    !existingQuestions ? [] : existingQuestions
  );
  const manageQuizzes = new ManageCollectionState([questions, updateQuestions]);

  useEffect(() => {
    update(questions);
  }, [questions]);

  return (
    <div className="manageQuiz">
      <label>الأسئلة</label>
      <ul>
        {questions.map((q, i) => {
          return (
            <ManageQuestion
              key={i}
              question={q}
              updateQuestion={(question) =>
                manageQuizzes.updateOne(question, i)
              }
            />
          );
        })}
      </ul>
      <PlusMinusButtons
        onPlus={() => {
          manageQuizzes.addOne({
            questionTitle: "",
            order: questions.length - 1,
            type: "WRITTEN",
            fullMark: 0,
          });
        }}
        onMinus={() => {
          manageQuizzes.removeLast();
        }}
        minusDisabled={questions.length == 0}
      />
    </div>
  );
};

const ManageQuestion = ({ question, updateQuestion }) => {
  const [content, updateContent] = useState(question);

  useEffect(() => updateQuestion(content), [content]);

  return (
    <li className="manageQuestion">
      <input
        className="questionTitleInput form-control"
        type="text"
        placeholder={"السؤال"}
        value={content.questionTitle}
        onInput={(e) => {
          updateContent({ ...content, questionTitle: e.target.value });
        }}
      />
      <label className="mcqLabel">
        <input
          type="checkbox"
          value=""
          onChange={(e) =>
            updateContent({
              ...content,
              type: e.target.checked ? "MCQ" : "WRITTEN",
              answers: [],
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
        []
      )}
    </li>
  );
};

const ManageMCQAnswers = ({ existingAnswers, update }) => {
  const [answers, updateAnswers] = useState(existingAnswers || []);
  const manageAnswers = new ManageCollectionState([answers, updateAnswers]);

  useEffect(() => update(manageAnswers.collection), [manageAnswers.collection]);

  return (
    <>
      <ul>
        {answers.map((a, i) => {
          return (
            <li key={i}>
              <input
                className="answerInput form-control"
                type="text"
                placeholder={"اجابة"}
                value={a.answerText}
                onInput={(e) => {
                  manageAnswers.updateOne(
                    { ...answers[i], answerText: e.target.value },
                    i
                  );
                }}
              />
              <label className="correctAnswerLabel">
                <input
                  type="checkbox"
                  value={a.isCorrect}
                  onChange={(e) =>
                    manageAnswers.updateOne(
                      {
                        ...answers[i],
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
        minusDisabled={answers.length == 0}
      />
    </>
  );
};

export default ManageQuiz;
