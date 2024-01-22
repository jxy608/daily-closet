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

router.post("/clothingarticle", (req, res) => {
  // TODO: add router post method for adding new clothing articles
  // No idea if i did this right lol
  // console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);
  console.log(`New clothing article added, named ${req.body.name}`);
  console.log(req.body.userId);

  // insert this clothing article into the database
  const clothingarticle = new ClothingArticle({
    userId: req.body.userId,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
    num_wears: req.body.num_wears,
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

// router.get("/user", (req, res) => {
//   console.log("getting user");
//   console.log(req.session);
//   console.log(req.session.user);
//   console.log(req.user);
//   console.log("req id???");
//   console.log(req.user._id);
//   const query = { _id: ObjectId(req.user._id) };
//   console.log(query);
//   User.find(query).then((user) => res.send(user));
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
