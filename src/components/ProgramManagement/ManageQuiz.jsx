import React, { useState, useEffect, Fragment } from "react";
import PlusMinusButtons from "../Shared/PlusMinusButtons";
import "./ManageQuiz.scss";

//TODO fetch quiz data via api
const ManageQuiz = ({ isNewQuiz, existingQuestions, update }) => {
  const [questions, updateQuestions] = useState(
    isNewQuiz ? [] : existingQuestions
  );

  const updateOneQuestion = (question, index) => {
    const current = [...questions];
    current[index] = { ...current[index], ...question };
    updateQuestions(current);
  };

  const addQuestion = (question) => updateQuestions([...questions, question]);
  const removeQuestion = (index) => {
    const current = [...questions];
    current.splice(index, 1);
    updateQuestions(current);
  };

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
              updateQuestion={(question) => updateOneQuestion(question, i)}
            />
          );
        })}
      </ul>
      <PlusMinusButtons
        onPlus={() => {
          addQuestion({
            questionTitle: "",
            order: questions.length - 1,
            type: "WRITTEN",
            fullMark: 0,
          });
        }}
        onMinus={() => {
          removeQuestion(questions.length - 1);
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

  const updateOneAnswer = (answer, index) => {
    const current = [...answers];
    current[index] = { ...current[index], ...answer };
    updateAnswers(current);
  };

  const addAnswer = (answer) => updateAnswers([...answers, answer]);
  const removeAnswer = (index) => {
    const current = [...answers];
    current.splice(index, 1);
    updateAnswers(current);
  };

  useEffect(() => update(answers), [answers]);

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
                  updateOneAnswer(
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
                    updateOneAnswer(
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
          addAnswer({
            answerText: "",
            isCorrect: false,
          });
        }}
        onMinus={() => {
          removeAnswer(answers.length - 1);
        }}
        minusDisabled={answers.length == 0}
      />
    </>
  );
};

export default ManageQuiz;
