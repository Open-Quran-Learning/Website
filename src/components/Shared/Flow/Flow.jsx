import React, { useState, Fragment } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./Flow.scss";

export const ControlledFlow = ({ flowStops }) => {
  const [currentStop, updateCurrentStop] = useState(0);
  return (
    <div className="controlledFlow">
      <Flow currentStop={currentStop} flowStops={flowStops} />
      <div className="navigationBtns">
        <button
          type="button"
          disabled={currentStop == 0}
          className="btn btn-danger"
          onClick={() => updateCurrentStop(currentStop - 1)}
        >
          رجوع
        </button>
        <button
          type="button"
          disabled={currentStop == flowStops.length - 1}
          className="btn btn-success"
          onClick={() => updateCurrentStop(currentStop + 1)}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export const Flow = ({ currentStop, flowStops }) => (
  <div className="flow">
    <SwitchTransition mode={"out-in"}>
      <CSSTransition
        key={currentStop}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        classNames="fade"
      >
        <div className="currentStop" key={currentStop}>
          {flowStops[currentStop]()}
        </div>
      </CSSTransition>
    </SwitchTransition>
  </div>
);
