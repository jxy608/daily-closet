import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./LaundryModal.css";
import { get } from "../../utilities";

import NewClothingCard from "./NewClothingCard.js";
import ClothingCard from "./ClothingCard.js";

import xButton from "../../../assets/x-button.svg";

const LaundryModal = (props) => {
  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "Clothes";
  }, []);

  return (
    <>
      {!props.hidden && (
        <>
          <div className="laundrySectionContainer">
            <div className="laundryTitle">{props.title}</div>
            <div className="x" onClick={props.closeModal}>
              <img src={xButton} className="x-image" />
            </div>
            <div className="laundryContents">
              {props.laundryList ? (
                props.laundryList.map((c, idx) => (
                  <ClothingCard
                    image={c.image}
                    name={c.name}
                    color={c.color}
                    category={c.type}
                    max_wears={c.max_wears}
                    key={idx}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LaundryModal;
