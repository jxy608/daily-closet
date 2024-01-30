import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import ClosetModal from "../modules/ClosetModal.js";
import "./Closet.css";
import closetInside from "../../../assets/DC_big_closet.svg";

const Closet = (props) => {
  const [clothes, setClothes] = useState([]);

  const [modalState, setModalState] = useState("empty");

  const openModal = (section) => {
    setModalState(section);
    document.body.style.overflow = "hidden";
    document.getElementById("modal-overlay").style.display = "block";
  };

  const closeModal = () => {
    setModalState("");
    document.body.style.overflow = "scroll";
    document.getElementById("modal-overlay").style.display = "none";
  };

  const closetSections = [
    {
      title: "tops",
    },
    {
      title: "bottoms",
    },
    {
      title: "shoes",
    },
    {
      title: "outerwear",
    },
    {
      title: "one pieces",
    },
    {
      title: "accessories",
    },
  ];

  return (
    <div>
      <BackButton redirect="home" />
      {/* <h1 className="u-textCenter">hello welcome to the closet</h1> */}
      <div id="modal-overlay" className="modal-overlay"></div>
      <div className="closet-container">
        <svg id="Layer_2" className="closet" data-name="Layer 2" viewBox="0 0 937.53 603.34">
          <g id="outer_frame">
            <path
              className="cls-8"
              d="m13.5,2c111.51,0,846.68,0,917.51,0,2.91,0,5.07,2.72,4.38,5.55-1.21,4.97-3.54,11.97-7.52,15.27h-16.99v553.95h5.94c4.72,0,8.26,4.33,7.29,8.94-.86,4.09-3.02,9.42-7.94,15.63H26.94c-6.39,0-12.35-3.29-15.69-8.74-1.21-1.97-2.25-4.23-2.87-6.71s1.08-5.19,3.72-5.63l11.11-1.82V31.87s-13.45,2.26-20.27-13.79C-.3,10.46,5.22,2,13.5,2Z"
            />
          </g>
          <g id="inner_frames">
            <polygon
              className="cls-6"
              points="31.1 32.19 319.87 32.19 319.87 453.32 32.53 453.32 31.1 32.19"
            />
            <rect className="cls-6" x="330.5" y="29.52" width="287.37" height="213.23" />
            <rect className="cls-6" x="330.5" y="252.18" width="289.25" height="201.14" />
            <rect className="cls-6" x="628.73" y="29.52" width="270.17" height="289.63" />
            <rect className="cls-6" x="628.73" y="416.45" width="270.17" height="157.21" />
            <rect className="cls-6" x="32.6" y="465.71" width="587.15" height="107.95" />
          </g>
          <g id="back">
            <g>
              <rect className="cls-5" x="628.73" y="416.45" width="159.71" height="98.4" />
              <rect className="cls-5" x="141.45" y="465.71" width="446.71" height="49.15" />
            </g>
            <g>
              <rect className="cls-5" x="141.45" y="83.36" width="178.41" height="345.67" />
              <rect className="cls-5" x="358.59" y="83.36" width="235.18" height="159.39" />
              <rect className="cls-5" x="358.59" y="265.63" width="235.18" height="161.68" />
              <rect className="cls-5" x="628.73" y="83.36" width="159.43" height="218.31" />
            </g>
          </g>
          <g id="top_sides">
            <polygon
              className="cls-2"
              points="898.9 29.52 788.16 83.36 788.16 301.67 898.9 319.15 898.9 29.52"
            />
            <polygon
              className="cls-2"
              points="31.1 32.19 141.45 83.36 141.45 429.03 32.53 453.32 31.1 32.19"
            />
            <polygon
              className="cls-2"
              points="330.5 29.52 358.59 83.36 358.59 242.75 330.5 242.75 330.5 29.52"
            />
            <polygon
              className="cls-2"
              points="617.86 29.52 593.77 83.36 593.77 242.75 617.86 242.75 617.86 29.52"
            />
            <polygon
              className="cls-2"
              points="619.74 252.18 593.77 265.63 593.77 427.31 619.74 453.32 619.74 252.18"
            />
            <polygon
              className="cls-2"
              points="330.5 252.18 330.5 453.32 358.59 427.31 358.59 265.63 330.5 252.18"
            />
          </g>
          <g id="bot_sides">
            <g>
              <polygon
                className="cls-3"
                points="788.44 416.45 788.44 514.85 898.9 573.66 898.9 416.45 788.44 416.45"
              />
              <polygon
                className="cls-3"
                points="588.16 514.85 619.74 573.66 619.74 465.71 588.16 465.71 588.16 514.85"
              />
              <polygon
                className="cls-3"
                points="141.45 514.85 32.6 573.66 32.6 465.71 141.45 465.71 141.45 514.85"
              />
            </g>
          </g>
          <g id="drawer">
            <rect className="cls-1" x="628.73" y="330.02" width="270.17" height="74.67" />
            <path
              className="cls-4"
              d="m747,365.35s21.35-6.51,41.16-1.3c0,0,.29,2.63-3.61,4.19l-35.5,1.01s-2.04-.37-2.04-3.9Z"
            />
            <g id="racks">
              <g>
                <path
                  className="cls-7"
                  d="m628.73,95.28l.14,6.33h216.28s5-6.33,0-7.66l-216.41,1.33Z"
                />
                <path className="cls-7" d="m319.62,95.28H85.34s-6.83,1.17,0,8h234.27v-8Z" />
                <path className="cls-7" d="m607.2,95.28h-263.6s-3.67,3,1.33,8h260.26s6-5.33,2-8Z" />
              </g>
              <path className="cls-7" d="m607.2,293.67h-263.6s-3.67,3,1.33,8h260.26s6-5.33,2-8Z" />
            </g>
          </g>
          <g id="sections">
            <rect
              className="section"
              onClick={() => openModal("shoes")}
              id="shoes"
              x="32.6"
              y="465.71"
              width="587.14"
              height="107.95"
            />
            <rect
              className="section"
              onClick={() => openModal("one pieces")}
              id="onePieces"
              x="31.1"
              y="32.19"
              width="288.77"
              height="421.13"
            />
            <rect
              className="section"
              onClick={() => openModal("tops")}
              id="tops"
              x="330.5"
              y="29.52"
              width="287.36"
              height="213.23"
            />
            <rect
              className="section"
              onClick={() => openModal("bottoms")}
              id="bottoms"
              x="330.5"
              y="252.18"
              width="289.24"
              height="201.14"
            />
            <rect
              className="section"
              onClick={() => openModal("outerwear")}
              id="outerwear"
              x="628.73"
              y="29.52"
              width="270.17"
              height="289.63"
            />
            <rect
              className="section"
              onClick={() => openModal("accessories")}
              id="accessories"
              x="628.73"
              y="330.02"
              width="270.17"
              height="243.45"
            />
          </g>
          <g id="labels">
            <text
              className="label"
              x="175.49"
              y="242.76"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              one pieces
            </text>
            <text
              className="label"
              x="474.18"
              y="136.14"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              tops
            </text>
            <text
              className="label"
              x="475.12"
              y="352.75"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              bottoms
            </text>
            <text
              className="label"
              x="763.82"
              y="174.34"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              outerwear
            </text>
            <text
              className="label"
              x="326.17"
              y="519.69"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              shoes
            </text>
            <text
              className="label"
              x="763.82"
              y="451.75"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              accessories
            </text>
          </g>
        </svg>
        {closetSections.map((s, idx) => (
          <ClosetModal
            title={s.title}
            closeModal={closeModal}
            hidden={s.title !== modalState}
            userId={props.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Closet;
