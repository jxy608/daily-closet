import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./ClosetModal.css";
import { get } from "../../utilities";

import xButton from "../../../assets/x-button.svg";

const ClosetModal = (props) => {
  const [clothes, setClothes] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "Clothes";
    get("/api/clothes", { userId: props.userId, type: props.title }).then((clothes) => {
      setClothes(clothes);
    });
  }, []);

  let clothesList = null;
  const hasClothes = clothes.length !== 0;
  if (hasClothes) {
    clothesList = clothes.map((clothingArticle) => (
      <p>
        {clothingArticle.name}: {clothingArticle.color} {clothingArticle.type}, wearable{" "}
        {clothingArticle.max_wears} times.
      </p>
      // <Card
      //   key={`Card_${storyObj._id}`}
      //   _id={storyObj._id}
      //   creator_name={storyObj.creator_name}
      //   creator_id={storyObj.creator_id}
      //   userId={props.userId}
      //   content={storyObj.content}
      // />
    ));
  } else {
    clothesList = <div>No clothes!</div>;
  }

  return (
    <>
      {!props.hidden && (
        <>
          <div className="closetSectionContainer">
            <div className="closetTitle">{props.title}</div>
            <div className="x" onClick={props.closeModal}>
              <img src={xButton} className="x-image" />
            </div>
            <div>{clothesList}</div>
          </div>
        </>
      )}
    </>
  );
};

export default ClosetModal;
