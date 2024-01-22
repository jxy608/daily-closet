import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./ClosetModal.css";

import xButton from "../../../assets/x-button.svg";

const ClosetModal = (props) => {
  const [section, setSection] = useState("section");
  return (
    <>
      {!props.hidden && (
        <>
          <div className="closetSectionContainer">
            <div className="closetTitle">{props.title}</div>
            <div className="x" onClick={props.closeModal}>
              <img src={xButton} className="x-image" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClosetModal;
