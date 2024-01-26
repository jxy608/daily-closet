/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const ClothingArticle = require("./models/clothingarticle");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const countryCode = "US";
const part = "current,minutely,hourly,alerts";
const openWeatherKey = process.env.OPEN_WEATHER_KEY;

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/clothes", (req, res) => {
  let typeString = req.query.type;
  switch (req.query.type) {
    case "tops":
      typeString = "top";
      break;
    case "bottoms":
      typeString = "bottom";
      break;
    case "shoes":
      typeString = "shoe";
      break;
    case "accessories":
      typeString = "accessory";
      break;
    case "one pieces":
      typeString = "one piece";
      break;
  }
  const query = { userId: req.query.userId, type: typeString };
  console.log(query);
  ClothingArticle.find(query).then((clothes) => res.send(clothes));

  // ClothingArticle.find({}).then((clothes) => res.send(clothes));
});

function getClothingItem(array) {
  if (array.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

router.get("/outfit", async (req, res) => {
  const high = req.query.high;
  const low = req.query.low;
  console.log(high);
  console.log(low);

  try {
    // try {
    const tops = await ClothingArticle.find({
      userId: req.query.userId,
      type: "top",
      max_temp: {
        $gte: high,
      },
      min_temp: {
        $lte: low,
      },
    });
    const bottoms = await ClothingArticle.find({
      userId: req.query.userId,
      type: "bottom",
      max_temp: {
        $gte: high,
      },
      min_temp: {
        $lte: low,
      },
    });
    // } catch {
    //   const tops = await ClothingArticle.find({
    //     userId: req.query.userId,
    //     type: "top",
    //   });
    //   const bottoms = await ClothingArticle.find({ userId: req.query.userId, type: "bottom" });
    // }

    console.log("tops", tops);
    console.log("bottoms", bottoms);

    const randomTop = getClothingItem(tops);
    const randomBottom = getClothingItem(bottoms);

    console.log("outfit is", randomTop, randomBottom);

    res.send({ top: randomTop.image, bottom: randomBottom.image });
  } catch (error) {
    console.error("Error fetching outfit from server:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/clothingarticle", (req, res) => {
  // TODO: add router post method for adding new clothing articles
  // No idea if i did this right lol
  // console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);
  console.log(`New clothing article added, named ${req.body.name}`);
  console.log(req.body.userId);

  // insert this clothing article into the database
  const clothingarticle = new ClothingArticle({
    userId: req.body.userId,
    image: req.body.image,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    max_wears: req.body.max_wears,
    // tags: req.body.tags,
    min_temp: req.body.min_temp,
    max_temp: req.body.max_temp,
  });
  clothingarticle.save();
});

router.post("/user", (req, res) => {
  console.log(`updating user settings of user ${req.body._id}`);

  const query = { _id: ObjectId(req.body._id) };
  const { _id, ...newUser } = req.body;

  User.findOneAndUpdate(query, newUser, { new: true })
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating user");
    });
});

router.get("/user", (req, res) => {
  const query = { _id: ObjectId(req.query.userId) };
  User.find(query).then((user) => res.send(user));
});

router.get("/weather", (req, res) => {
  console.log("getting weather");
  const zipCode = req.query.zipCode;
  const units = req.query.units;
  console.log(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherKey}`
  );
  fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const lat = data.lat;
      const lon = data.lon;
      // Fetch weather data using coordinates
      return fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${openWeatherKey}&units=${units}`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data: ", error);
    });
});

router.get("/user", (req, res) => {
  console.log("getting user");
  console.log(req.session);
  console.log(req.session.user);
  console.log(req.user);
  console.log("req id???");
  console.log(req.user._id);
  const query = { _id: ObjectId(req.user._id) };
  console.log(query);
  User.find(query).then((user) => res.send(user));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
