import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utilities";

const Closet = (props) => {
  const [clothes, setClothes] = useState([]);

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "Clothes";
    get("/api/clothes").then((clothes) => {
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
      <h1 className="u-textCenter">hello welcome to the closet</h1>
      <div>
        <Link to={`/home/`}>home</Link>
      </div>
      <div>
        <Link to={`/new/`}>new clothing article</Link>
      </div>
      <div>{clothesList}</div>
    </div>
  );
};

export default Closet;
