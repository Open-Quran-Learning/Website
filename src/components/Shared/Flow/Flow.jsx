import React, { useState, Fragment } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./Flow.scss";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const FlowModal = ({ flowStops, isShown, onFinish, onCancel }) => {
  const [currentStop, updateCurrentStop] = useState(0);

  const firstStop = currentStop === 0;
  const lastStop = currentStop === flowStops.length - 1;

  return (
    <div className="modalFlow">
      <Modal unmountOnClose={true} className="modal-xl" isOpen={isShown}>
        <ModalHeader> {flowStops[currentStop].title} </ModalHeader>
        <ModalBody>
          <div className="flowModalContent">
            <Flow
              currentStop={currentStop}
              flowStops={flowStops.map((it) => it.content)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="navigationBtns">
            <button
              type="button"
              disabled={!flowStops[currentStop].canGoNext()}
              className="btn btn-success"
              onClick={() => {
                if (window.confirm("تأكيد؟")) {
                  flowStops[currentStop].action();
                  if (lastStop) {
                    if (onFinish) onFinish();
                  } else {
                    updateCurrentStop(currentStop + 1);
                  }
                }
              }}
            >
              {lastStop
                ? "انتهاء"
                : ` حفظ وانتقال إلى ${flowStops[currentStop + 1].title}`}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("تأكيد؟")) {
                  if (onCancel) onCancel();
                }
              }}
            >
              إلغاء
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const ControlledFlow = ({ flowStops }) => {
  const [currentStop, updateCurrentStop] = useState(0);
  return (
    <div className="controlledFlow">
      <Flow currentStop={currentStop} flowStops={flowStops} />
      <div className="navigationBtns">
        <button
          type="button"
          disabled={currentStop === flowStops.length - 1}
          className="btn btn-success"
          onClick={() => updateCurrentStop(currentStop + 1)}
        >
          التالي
        </button>
        <button
          type="button"
          disabled={currentStop === 0}
          className="btn btn-danger"
          onClick={() => updateCurrentStop(currentStop - 1)}
        >
          رجوع
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
          {flowStops[currentStop]}
        </div>
      </CSSTransition>
    </SwitchTransition>
  </div>
);
