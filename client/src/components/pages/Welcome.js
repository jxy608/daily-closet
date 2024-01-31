import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Welcome.css";
import PrevButton from "../../../assets/prev.svg";
import NextButton from "../../../assets/next.svg";
import ClosetIcon from "../../../assets/closet_icon.png";
import ClosetSection from "../../../assets/closet_section.png";
import UploadClothing from "../../../assets/upload_clothing.png";
import Homepage from "../../../assets/homepage.png";
import Closet from "../../../assets/closet.png";

const Welcome = ({ userId, handleLogout }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const header = [
    "picture this...",
    "that's where daily closet comes in!",
    UploadClothing,
    Closet,
    ClosetSection,
    Homepage,
    ClosetIcon,
  ];
  const content = [
    "You wake up in the morning, still groggy from staying up late to finish up your psets. Your blinds are closed, and your brain is dead. As you open your closet, the Jane Street t-shirt in the front seems to speak to you, but you vaguely recall already having worn it twice this week. You sniff the armpits. Is three times a week too much? What if it’s cold outside? What in the world do you wear?",
    "Daily Closet is your one-stop-shop for closet management and daily outfit recommendations, so you can know what to wear without having to use your brain. Whether it’s sun, rain, or snow, you’ll have a perfect outfit ready to go!",
    "As a new user to Daily Closet, after inputting your user settings, you will upload photos of your clothes, which you can then categorize and adjust based on the appropriate temperature range to wear the outfit in.",
    "You can view and manage your closet and all of the clothes you’ve uploaded to the website on our closet page, which is categorized into sections to be easily accessible. For example, if you want to view all of your tops, click on the “tops” section of the closet to access all of the clothes you have uploaded. You’ll also be able to add new articles of clothing in this page after a good retail therapy session.",
    "Each of the clothing categories will bring up a simple pop-up menu where you can scroll through your catalog of clothes. You can then edit your individual clothes through this menu if you realize that the sweater your mom gave you wasn’t quite as warm as you thought it would be.",
    "Last but certainly not least is the homepage you'll access everything from. Here, you’ll get a daily outfit recommended to you based on the temperature and weather in your location. If you don’t like the outfit generated, you can shuffle to get a new one recommended to you. Daily Closet keeps track of the number of times you’ve accepted or declined to wear certain articles of clothing, and will recommend you sell or donate clothes you don’t wear often to free up closet space! (See the recycle button on the closet page for more details.)",
    "Daily Closet is for any person at any age. Whether you’re an MIT student whose closet largely consists of free career fair t-shirts or a mid-career professional looking to up your fashion game while using less brainpower, Daily Closet is here to guide you at any step along the way. Click begin to start your journey now!",
  ];

  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleBegin = () => {
    navigate(`/settings/welcome`);

  };

  return (
    <div className="u-flexColumn u-flex-alignCenter" style={{ gap: "5px", margin: "20px 0" }}>
      <h1 className="u-textCenter">welcome to daily closet!</h1>
      {index <= 1 ? (
        <h2>{header[index]}</h2>
      ) : (
        <img src={header[index]} style={{ height: "200px" }} />
      )}
      {index <= 1 ? (
        <div className="text-container" style={{ margin: "5px 0", height: "30vh" }}>
          {content[index]}
        </div>
      ) : (
        <div className="text-container" style={{ margin: "5px 0", height: "16vh" }}>
          {content[index]}
        </div>
      )}

      <div className="control-container" style={{ margin: "5px 0" }}>
        {index > 0 ? (
          <img onClick={handlePrev} src={PrevButton} style={{ cursor: "pointer" }} />
        ) : (
          <></>
        )}
        {index < content.length - 1 ? (
          <img onClick={handleNext} src={NextButton} style={{ cursor: "pointer" }} />
        ) : (
          <></>
        )}
      </div>

      {index === content.length - 1 ? (
        <button onClick={handleBegin} className="u-button">
          Begin
        </button>
      ) : (
        <></>
      )}

      <div style={{ margin: "70px 0" }}>made with love by team jelly eclair!</div>
    </div>
  );
};

export default Welcome;
