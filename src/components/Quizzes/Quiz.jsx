import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ questions }) => (
  <div className="mcqQuiz">
    {questions
      .sort((q1, q2) => q1.order - q2.order)
      .map((q) =>
        q.type === "MCQ" ? (
          <MCQQuestion
            questionTitle={q.questionTitle}
            mark={q.mark}
            answers={q.answers}
            key={q.order}
          />
        ) : (
          <WrittenQuestion
            questionTitle={q.questionTitle}
            isOptional={q.isOptional}
            key={q.order}
          />
        )
      )}
  </div>
);

const MCQQuestion = ({ questionTitle, mark, answers }) => {
  const [isAnsweredCorrectly, setAnsweredCorrectly] = useState(false);

  return (
    <div className="mcqQuestion">
      <div className="questionText">{questionTitle}</div>
      <MCQAnswers onAnswered={setAnsweredCorrectly} answers={answers} />
      <div className="separator"></div>
    </div>
  );
};

const MCQAnswers = (props) => {
  let isSingleAnswered = props.answers.filter((a) => a.isCorrect).length > 1;

  return (
    <div>
      {props.answers.map((answer, i) =>
        isSingleAnswered ? (
          <RadioAnswer
            text={answer.answerText}
            onClick={() => props.onAnswered(answer.isCorrect)}
            key={i}
          />
        ) : (
          <CheckedAnswer
            text={answer.answerText}
            onClick={() => props.onAnswered(answer.isCorrect)}
            key={i}
          />
        )
      )}
    </div>
  );
};

const RadioAnswer = (props) => (
  <div className="radio answer">
    <label>
      <input type="radio" name="optradio" />
      {props.text}
    </label>
  </div>
);

const CheckedAnswer = (props) => (
  <div className="checkbox answer">
    <label>
      <input type="checkbox" value="" /> {props.text}
    </label>
  </div>
);

const WrittenQuestion = ({ questionTitle, isOptional}) => (
  <div className="writtenQuestion">
    <div className="questionText">{questionTitle}</div>
    <textarea required={isOptional} class="form-control" rows="5" id="comment"></textarea>
    <div className="separator"></div>
  </div>
);

export default Quiz;
