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
  const query = { userId: req.query.userId };
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
  console.log(`updating user settings of user ${req.body.userId}`);
  // insert this clothing article into the database

  const user = new User({
    ...req.body,
  });

  user.save();
});

router.get("/user", (req, res) => {
  console.log("getting user");
  console.log(req);
  const query = { _id: ObjectId(req.query.userId) };
  console.log(query);
  User.find(query).then((user) => res.send(user));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
