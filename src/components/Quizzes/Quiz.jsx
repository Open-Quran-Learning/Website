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
  const canSubmit = !isSubmitted && answeredQuestions.every((q) =>
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
                inReview={isSubmitted}
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
                inReview={isSubmitted}
                key={q.order}
              />
            )}
          </>
        ))}
      <button
        type="button"
        className="btn btn-success"
        disabled={!canSubmit}
        onClick={() => setIsSubmetted(true)}
      >
        سلّم الإجابات
      </button>
    </div>
  );
};

const MCQQuestion = ({
  questionTitle,
  answers,
  inReview,
  q_id,
  onAnswered,
}) => {
  const [grade, setGrade] = useState(-1);
  // TODO: display score
  useSkippingEffect(() => {
    onAnswered(q_id, grade);
  }, [grade]);
  return (
    <div className="mcqQuestion">
      <div className="questionText">{questionTitle}</div>
      <MCQAnswers
        inReview={inReview}
        onAnswered={setGrade}
        answers={answers}
        q_id={q_id}
      />
      <div className="separator"></div>
    </div>
  );
};

const MCQAnswers = ({ onAnswered, answers, inReview, q_id }) => {
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
              inReview={inReview}
              isCorrect={answer.isCorrect}
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
              inReview={inReview}
              isCorrect={answer.isCorrect}
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

const RadioAnswer = ({ text, onSelect, inReview, isCorrect, q_id }) => (
  <div
    className={`radio answer ${
      inReview ? (isCorrect ? "correctAnswer" : "wrongAnswer") : ""
    }`}
  >
    <label>
      <input
        type="radio"
        name={`optradio${q_id}`}
        onChange={onSelect}
        disabled={inReview}
      />
      {text}
    </label>
  </div>
);

const CheckedAnswer = ({ text, inReview, onSelect, isCorrect }) => (
  <div
    className={`checkbox answer ${
      inReview ? (isCorrect ? "correctAnswer" : "wrongAnswer") : ""
    }`}
  >
    {console.log(inReview)}
    <label>
      <input type="checkbox" value="" onChange={onSelect} disabled={inReview} />
      {text}
    </label>
  </div>
);

const WrittenQuestion = ({ questionTitle, isOptional, inReview, q_id }) => {
  return (
    <div className="writtenQuestion">
      <div className="questionText">{questionTitle}</div>
      <textarea class="form-control" rows="5" disabled={inReview}></textarea>
      <div className="separator"></div>
    </div>
  );
};

export default Quiz;
