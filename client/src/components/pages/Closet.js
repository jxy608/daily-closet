import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import ClosetModal from "../modules/ClosetModal.js";
import "./Closet.css";

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

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "Clothes";
    get("/api/clothes", { userId: props.userId }).then((clothes) => {
      setClothes(clothes);
    });
  }, []);

  let clothesList = null;
  const hasClothes = clothes.length !== 0;
  if (hasClothes) {
    clothesList = clothes.map((clothingArticle) => (
      <p>
        {clothingArticle.name}: {clothingArticle.color} {clothingArticle.type}, wearable{" "}
        {clothingArticle.num_wears} times.
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
    <div>
      <BackButton redirect="home" />
      <h1 className="u-textCenter">hello welcome to the closet</h1>
      <div>
        <Link to={`/new/`}>new clothing article</Link>
      </div>
      <div>{clothesList}</div>
      <div onClick={() => openModal("tops")}>tops</div>
      <div id="modal-overlay" class="modal-overlay"></div>
      <div className="closet-container">
        <ClosetModal title="tops" closeModal={closeModal} hidden={"tops" !== modalState} />
      </div>
    </div>
  );
};

export default Closet;
