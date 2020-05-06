import React, { useState, useEffect, Fragment as li } from "react";
import "./PlusMinusButtons.scss";

const PlusMinusButtons = ({ onPlus, onMinus, plusDisabled, minusDisabled }) => {
  return (
    <div className="plusMinusBtns">
      <button
        type="button"
        disabled={plusDisabled || false}
        className="btn btn-success"
        onClick={onPlus}
      >
        +
      </button>

      <button
        type="button"
        disabled={minusDisabled || false}
        className="btn btn-danger"
        onClick={onMinus}
      >
        -
      </button>
    </div>
  );
};

export default PlusMinusButtons;
