import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import ClosetModal from "../modules/ClosetModal.js";
import "./Closet.css";
import closetInside from "../../../assets/DC_big_closet.svg";
import declutterButton from "../../../assets/recycle.svg";
import floor from "../../../assets/floor.svg";

const Closet = (props) => {
  const params = useParams();
  const clothingType = params.clothingType;

  let section = clothingType;
  switch (clothingType) {
    case "top":
      section = "tops";
      break;
    case "bottom":
      section = "bottoms";
      break;
    case "shoe":
      section = "shoes";
      break;
    case "accessory":
      section = "accessories";
      break;
    case "one piece":
      section = "one pieces";
      break;
  }

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

  useEffect(() => {
    // Move the logic to open the modal inside useEffect
    if (section) {
      openModal(section);
    }
  }, [section]);

  return (
    <div>
      <BackButton redirect="home" />
      {/* <h1 className="u-textCenter">hello welcome to the closet</h1> */}
      <div id="modal-overlay" className="modal-overlay"></div>
      <div className="closet-container">
        <svg id="Layer_2" className="closet" data-name="Layer 2" viewBox="0 0 938.07 603.34">
          <g id="outer_frame">
            <path
              className="cls-9"
              d="m27.49,601.34h881.01c5.78,0,31.97-25.8,2.95-30.5V26.09c27.7,0,24.5-18.54,24.5-18.54-.43-4.78-11.66-5.55-14.57-5.55-71.07,0-800.81,0-908.45,0-8.39,0-13.85,9.31-9.27,16.34,5.22,8.01,20.1,8.37,20.1,8.37v544.14l-11.11,5.78s-12.6,11.02,14.84,24.72Z"
            />
          </g>
          <g id="inner_frames">
            <polygon
              className="cls-7"
              points="31.66 26.71 320.43 26.71 320.43 450.5 33.09 450.5 31.66 26.71"
            />
            <rect className="cls-7" x="331.06" y="26.71" width="287.37" height="213.23" />
            <rect className="cls-7" x="331.06" y="249.36" width="287.37" height="201.14" />
            <rect className="cls-7" x="629.29" y="26.71" width="270.17" height="289.63" />
            <rect className="cls-4" x="629.29" y="413.64" width="270.17" height="157.21" />
            <rect className="cls-4" x="33.15" y="462.89" width="587.15" height="107.95" />
          </g>
          <g id="back">
            <g>
              <g>
                <rect className="cls-2" x="629.29" y="413.64" width="159.71" height="98.4" />
                <rect className="cls-2" x="142.01" y="462.89" width="446.71" height="49.15" />
              </g>
              <g>
                <rect className="cls-6" x="142.01" y="80.54" width="178.41" height="345.67" />
                <rect className="cls-6" x="359.15" y="80.54" width="235.18" height="159.39" />
                <rect className="cls-6" x="359.15" y="262.81" width="235.18" height="161.68" />
                <rect className="cls-6" x="629.29" y="80.54" width="159.43" height="218.31" />
              </g>
            </g>
          </g>
          <g id="top_sides">
            <polygon
              className="cls-3"
              points="899.46 26.71 788.72 80.54 788.72 298.86 899.46 316.34 899.46 26.71"
            />
            <polygon
              className="cls-3"
              points="31.66 29.38 142.01 80.54 142.01 426.21 33.09 450.5 31.66 29.38"
            />
            <polygon
              className="cls-3"
              points="331.06 26.71 359.15 80.54 359.15 239.94 331.06 239.94 331.06 26.71"
            />
            <polygon
              className="cls-3"
              points="618.42 26.71 594.33 80.54 594.33 239.94 618.42 239.94 618.42 26.71"
            />
            <polygon
              className="cls-3"
              points="620.3 249.36 594.33 262.81 594.33 424.49 620.3 450.5 620.3 249.36"
            />
            <polygon
              className="cls-3"
              points="331.06 249.36 331.06 450.5 359.15 424.49 359.15 262.81 331.06 249.36"
            />
          </g>
          <g id="bot_sides">
            <g>
              <polygon
                className="cls-4"
                points="789 413.64 789 512.03 899.46 570.84 899.46 413.64 789 413.64"
              />
              <polygon
                className="cls-4"
                points="588.72 512.03 620.3 570.84 620.3 462.89 588.72 462.89 588.72 512.03"
              />
              <polygon
                className="cls-4"
                points="142.01 512.03 33.15 570.84 33.15 462.89 142.01 462.89 142.01 512.03"
              />
            </g>
          </g>
          <g id="drawer">
            <rect className="cls-1" x="629.29" y="327.2" width="270.17" height="74.67" />
            <path
              className="cls-5"
              d="m747.56,362.53s21.35-6.51,41.16-1.3c0,0,.29,2.63-3.61,4.19l-35.5,1.01s-2.04-.37-2.04-3.9Z"
            />
            <g id="racks">
              <g>
                <path
                  className="cls-8"
                  d="m629.29,102.47l.14,6.33h216.28s5-6.33,0-7.66l-216.41,1.33Z"
                />
                <path className="cls-8" d="m320.17,103.47H85.9s-6.83,1.17,0,8h234.27v-8Z" />
                <path
                  className="cls-8"
                  d="m607.76,102.47h-263.6s-3.67,3,1.33,8h260.26s6-5.33,2-8Z"
                />
              </g>
              <path className="cls-8" d="m607.76,290.86h-263.6s-3.67,3,1.33,8h260.26s6-5.33,2-8Z" />
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
      {props.declutterClothes && props.declutterClothes.length > 0 ? (
        <div className="declutter-button">
          <Link to={`/declutter/`}>
            <img src={declutterButton} />
          </Link>
        </div>
      ) : (
        <></>
      )}
      <img className="floor" src={floor} />
    </div>
  );
};

export default Closet;
