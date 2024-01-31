import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../utilities.css";
import "./Declutter.css";
import BackButton from "../modules/BackButton.js";
import ClothingCard from "../modules/ClothingCard.js";
import infoButton from "../../../assets/info.svg";

const Declutter = (props) => {
  // source: https://theroundup.org/textile-waste-statistics/
  const textLines = [
    "the fashion industry produces up to 100 billion garments every year, 92 million tons of which end up in landfills",
    // "compared to 15 years ago, we buy 60% more clothing, but we only wear each piece half as much before discarding it",
    // "here are some clothing articles that you don't seem to be wearing often",
    // "consider donating or selling these clothes instead of throwing them out in order to declutter your closet, help combat fashion waste, and help your clothes find a happy home",
    // "and if you're looking to add to your wardrobe, consider shopping second-hand :)",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState("darkbrown");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      if (currentIndex + 1 === textLines.length) {
        setBgColor("none");
      }
      console.log("index", currentIndex);
    }, 4000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, textLines.length]);

  return (
    <div className={`main-container ${bgColor}`}>
      {currentIndex < textLines.length ? (
        <div className="text-container">
          <h2 key={currentIndex} className="u-textCenter">
            {textLines[currentIndex]}
          </h2>
        </div>
      ) : (
        <div>
          <BackButton redirect="closet" />
          <h1 className="declutter-text u-textCenter">declutter</h1>
          <div className="closetContents">
            {props.clothes.length > 0 ? (
              props.clothes.map((c, idx) => (
                <ClothingCard
                  id={c._id}
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
          <Link to={`/declutter/`}>
            <img className="info-button" src={infoButton} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Declutter;
