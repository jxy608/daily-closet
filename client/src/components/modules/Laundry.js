import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import laundry0 from "../../../assets/laundry0.png";
import laundry25 from "../../../assets/laundry25.png";
import laundry50 from "../../../assets/laundry50.png";
import laundry75 from "../../../assets/laundry75.png";
import laundry100 from "../../../assets/laundry100.png";
import "./Laundry.css";

import LaundryModal from "./LaundryModal";

import { get } from "../../utilities";
import { useUser } from "../../contexts/UserContext";

const Laundry = (props) => {
  const [laundryList, setLaundryList] = useState([]);
  const [laundryStatus, setLaundryStatus] = useState(laundry0);
  const [laundryPercentage, setLaundryPercentage] = useState(0);
  const { user, setUser } = useUser();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
    document.getElementById("modal-overlay").style.display = "block";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "scroll";
    document.getElementById("modal-overlay").style.display = "none";
  };

  useEffect(() => {
    if (user && props.triggerUpdate) {
      console.log("laundry user: ", user);
      get("/api/laundryClothes", { userId: user[0]._id }).then((data) => {
        setLaundryList(data);
      });

      // Reset the trigger
      props.setTriggerUpdate(false);
    }
  }, [props.triggerUpdate, props.setTriggerUpdate]);

  useEffect(() => {
    if (user) {
      console.log("laundry user: ", user);
      get("/api/laundryClothes", { userId: user[0]._id }).then((data) => {
        setLaundryList(data);
      });
    }
  }, []);

  useEffect(() => {
    const numClothesInLaundry = laundryList.length;
    // TODO: don't hard code in the capacity! replace 20 w a user-defined val later
    const percentage = numClothesInLaundry / 10;
    setLaundryPercentage(percentage);
    console.log("percentage full: ", percentage);
    if (percentage <= 0) {
      setLaundryStatus(laundry0);
    } else if (percentage <= 0.25) {
      setLaundryStatus(laundry25);
    } else if (percentage <= 0.5) {
      setLaundryStatus(laundry50);
    } else if (percentage <= 0.75) {
      setLaundryStatus(laundry75);
    } else {
      setLaundryStatus(laundry100);
    }
  }, [laundryList]);

  return (
    <div>
      <h3>laundry</h3>
      <div>
        <div id="modal-overlay" className="modal-overlay"></div>
        <img className="laundryBasket" src={laundryStatus} onClick={openModal} />
        <LaundryModal
          name={user[0].name}
          closeModal={closeModal}
          hidden={!modalOpen}
          laundryList={laundryList}
          capacity={10}
          onButtonClick={props.onButtonClick}
        />
      </div>
    </div>
  );
};

export default Laundry;
