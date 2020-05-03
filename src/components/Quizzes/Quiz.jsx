import React, { useState, Fragment } from "react";
import "./Quiz.css";
import { useSkippingEffect } from "./utils";

const Quiz = ({ questions, evaluate }) => {
  const [isSubmitted, setIsSubmetted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    questions.map((q) => {
      return {
        q_id: q.order,
        isAnswered: false,
        isOptional: q.isOptional || false,
        grade: 0,
        fullMark: q.fullMark,
      };
    })
  );
  const canSubmit = answeredQuestions.every((q) =>
    q.isOptional ? true : q.isAnswered
  );

  return (
    <div className="mcqQuiz">
      {console.debug(answeredQuestions)}
      {questions
        .sort((q1, q2) => q1.order - q2.order)
        .map((q) => (
          <>
            {q.type === "MCQ" ? (
              <MCQQuestion
                questionTitle={q.questionTitle}
                fullMark={q.fullMark}
                answers={q.answers}
                onAnswered={(q_id, grade) => {
                  setAnsweredQuestions(
                    answeredQuestions.map((q) => {
                      return q_id === q.q_id
                        ? { ...q, isAnswered: true, grade: grade }
                        : q;
                    })
                  );
                }}
                q_id={q.order}
              />
            ) : (
              <WrittenQuestion
                questionTitle={q.questionTitle}
                isOptional={q.isOptional}
                key={q.order}
              />
            )}
          </>
        ))}
      <button type="button" className="btn btn-success" disabled={!canSubmit}>
        سلّم الإجابات
      </button>
    </div>
  );
};

const MCQQuestion = ({ questionTitle, answers, q_id, onAnswered }) => {
  const [grade, setGrade] = useState(0);

  useSkippingEffect(() => {
    onAnswered(q_id, grade);
  }, [grade]);
  return (
    <div className="mcqQuestion">
      <div className="questionText">{questionTitle}</div>
      <MCQAnswers onAnswered={setGrade} answers={answers} q_id={q_id} />
      <div className="separator"></div>
    </div>
  );
};

const MCQAnswers = ({ onAnswered, answers, q_id }) => {
  const isSingleCorrect = answers.filter((a) => a.isCorrect).length === 1;
  const [selectedAnswers, setSelectedAnswers] = useState(
    answers.map((a, i) => {
      return { id: i, isSelected: false, isCorrect: a.isCorrect };
    })
  );
  const correctScore = selectedAnswers.filter(
    (a) => a.isSelected && a.isCorrect
  ).length;
  const incorrectScore = selectedAnswers.filter(
    (a) => a.isSelected && !a.isCorrect
  ).length;

  useSkippingEffect(() => {
    onAnswered(correctScore === 0 ? 0 : correctScore - incorrectScore);
  }, [selectedAnswers]);

  return (
    <div>
      {answers.map((answer, i) => (
        <Fragment key={i}>
          {isSingleCorrect ? (
            <RadioAnswer
              q_id={q_id}
              text={answer.answerText}
              onSelect={() =>
                setSelectedAnswers(
                  selectedAnswers.map(
                    (a, id) =>
                      id === i
                        ? { ...a, isSelected: true }
                        : { ...a, isSelected: false } // unselect other radios.
                  )
                )
              }
            />
          ) : (
            <CheckedAnswer
              text={answer.answerText}
              onSelect={() =>
                setSelectedAnswers(
                  selectedAnswers.map(
                    (a, id) =>
                      id === i ? { ...a, isSelected: !a.isSelected } : a //toggle a checkbox
                  )
                )
              }
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

const RadioAnswer = ({ text, onSelect, q_id }) => (
  <div className="radio answer">
    <label>
      <input type="radio" name={`optradio${q_id}`} onChange={onSelect} />
      {text}
    </label>
  </div>
);

const CheckedAnswer = ({ text, onSelect }) => (
  <div className="checkbox answer">
    <label>
      <input type="checkbox" value="" onChange={onSelect} />
      {text}
    </label>
  </div>
);

const WrittenQuestion = ({ questionTitle, isOptional, q_id }) => {
  return (
    <div className="writtenQuestion">
      <div className="questionText">{questionTitle}</div>
      <textarea
        required={!isOptional}
        class="form-control"
        rows="5"
        id="comment"
      ></textarea>
      <div className="separator"></div>
    </div>
  );
};

export default Quiz;
