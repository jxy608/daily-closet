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

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/clothes", (req, res) => {
  // empty selector means get all documents
  ClothingArticle.find({}).then((clothes) => res.send(clothes));
});

router.post("/clothingarticle", (req, res) => {
  // TODO: add router post method for adding new clothing articles
  // No idea if i did this right lol
  // console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);
  console.log(`New clothing article added, named ${req.body.name}`);

  // insert this clothing article into the database
  const clothingarticle = new ClothingArticle({
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
