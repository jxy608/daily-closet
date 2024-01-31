/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const fetch = require("node-fetch");

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
  ClothingArticle.find(query).then((clothes) => res.send(clothes));

  // ClothingArticle.find({}).then((clothes) => res.send(clothes));
});

// Express route to get a clothing article by ID
router.get("/clothingarticle/:id", async (req, res) => {
  const articleId = req.params.id;

  // Check if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(articleId)) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  const objectId = new ObjectId(articleId);

  try {
    const foundArticle = await ClothingArticle.findById(objectId);

    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error finding clothing article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express route to update a clothing article by ID
router.post("/clothingarticle/:id", async (req, res) => {
  const articleId = req.params.id;
  const editedProperties = req.body.editedProperties;

  // Check if the provided ID is a valid ObjectId
  if (!ObjectId.isValid(articleId)) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  // Convert the string ID to an ObjectId
  const objectId = new ObjectId(articleId);

  try {
    const updatedArticle = await ClothingArticle.findOneAndUpdate(
      { _id: objectId },
      { $set: editedProperties },
      { new: true } // Return the modified document
    );

    if (updatedArticle) {
      res.send(updatedArticle);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error updating clothing article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

  try {
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

    // let randomTop = {
    //   image:
    //     "https://www.the-sun.com/wp-content/uploads/sites/6/2022/11/da5053e2-ebcc-42af-80f4-2433d01697ed.jpg?strip=all&quality=100&w=1920&h=1440&crop=1",
    // };
    // let randomBottom = {
    //   image:
    //     "https://www.the-sun.com/wp-content/uploads/sites/6/2022/11/da5053e2-ebcc-42af-80f4-2433d01697ed.jpg?strip=all&quality=100&w=1920&h=1440&crop=1",
    // };
    if (tops.length != 0 && bottoms.length != 0) {
      randomTop = getClothingItem(tops);
      randomBottom = getClothingItem(bottoms);
      res.send({ top: randomTop, bottom: randomBottom });
    } else {
      res.send({});
    }
  } catch (error) {
    console.error("Error fetching outfit from server:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/clothingarticle", (req, res) => {
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
    current_wears: req.body.current_wears,
    times_rejected: req.body.times_rejected,
  });
  clothingarticle.save();
  res.send(clothingarticle._id);
});

router.post("/user", (req, res) => {
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
  if (req.query.userId !== "null") {
    const query = { _id: ObjectId(req.query.userId) };
    User.find(query).then((user) => res.send(user));
  }
});

router.get("/weather", (req, res) => {
  const zipCode = req.query.zipCode;
  const units = req.query.units;
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

router.get("/laundryClothes", (req, res) => {
  ClothingArticle.aggregate([
    { $match: { userId: req.query.userId } },
    { $addFields: { isLaundryNeeded: { $gte: ["$current_wears", "$max_wears"] } } },
    { $match: { isLaundryNeeded: true } },
  ])
    .then((clothes) => {
      res.send(clothes);
    })
    .catch((err) => {
      console.error("Error fetching clothes for laundry:", err);
      res.status(500).send(err);
    });
});

router.post("/updateWears", (req, res) => {
  const idList = req.body.ids.map((articleId) => ObjectId(articleId));

  if (!Array.isArray(idList) || idList.length === 0) {
    return res.status(400).send({ error: "No clothing article IDs provided" });
  }

  const updateValue = req.body.updateValue;

  idList.forEach((id, index) => {
    ClothingArticle.findByIdAndUpdate(
      id,
      { $inc: { current_wears: updateValue } },
      { new: true },
      (err, updatedArticle) => {
        if (err) {
          console.log(`Error updating clothing article with ID ${id}:`, err);
          return res.status(500).send({ error: "Error updating clothing articles" });
        }
        if (index === idList.length - 1) {
          // if it's the last item, send a response
          res.send({ message: "Clothing articles updated successfully" });
        }
      }
    );
  });
});

router.post("/updateRejections", (req, res) => {
  const idList = req.body.ids.map((articleId) => ObjectId(articleId));

  if (!Array.isArray(idList) || idList.length === 0) {
    return res.status(400).send({ error: "No clothing article IDs provided" });
  }

  const updateValue = req.body.updateValue;

  idList.forEach((id, index) => {
    ClothingArticle.findByIdAndUpdate(
      id,
      { $inc: { times_rejected: updateValue } },
      { new: true },
      (err, updatedArticle) => {
        if (err) {
          console.log(`Error updating clothing article with ID ${id}:`, err);
          return res.status(500).send({ error: "Error updating clothing articles" });
        }
        if (index === idList.length - 1) {
          // if it's the last item, send a response
          res.send({ message: "Clothing articles updated successfully" });
        }
      }
    );
  });
});

router.post("/resetRejections", (req, res) => {
  const idList = req.body.ids.map((articleId) => ObjectId(articleId));

  if (!Array.isArray(idList) || idList.length === 0) {
    return res.status(400).send({ error: "No clothing article IDs provided" });
  }

  idList.forEach((id, index) => {
    ClothingArticle.findByIdAndUpdate(
      id,
      { times_rejected: 0 },
      { new: true },
      (err, updatedArticle) => {
        if (err) {
          console.log(`Error updating clothing article with ID ${id}:`, err);
          return res.status(500).send({ error: "Error updating clothing articles" });
        }
        if (index === idList.length - 1) {
          // if it's the last item, send a response
          res.send({ message: "Clothing articles updated successfully" });
        }
      }
    );
  });
});

router.post("/washLaundry", (req, res) => {
  const idList = req.body.ids.map((articleId) => ObjectId(articleId));

  if (!Array.isArray(idList) || idList.length === 0) {
    return res.status(400).send({ error: "No clothing article IDs provided" });
  }

  idList.forEach((id, index) => {
    ClothingArticle.findByIdAndUpdate(
      id,
      { current_wears: 0 },
      { new: true },
      (err, updatedArticle) => {
        if (err) {
          console.log(`Error updating clothing article with ID ${id}:`, err);
          return res.status(500).send({ error: "Error updating clothing articles" });
        }
        if (index === idList.length - 1) {
          // if it's the last item, send a response
          res.send({ message: "Clothing articles updated successfully" });
        }
      }
    );
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
