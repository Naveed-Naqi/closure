const express = require("express");
const router = express.Router();
const { Op, literal } = require("sequelize");
const { Place, Image, Like, Comment } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");
const upload = require("./upload");
const singleUpload = upload.single("image");
const axios = require("axios");
const validateAddPlaceInput = require("../validation/addPlace");

router.get("/", async (req, res, next) => {
  try {
    const places = await Place.findAll({ include: Image });
    res.status(200).send(places);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.get("/likedStatus", checkAuth, async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { placeId } = req.query;

    console.log(placeId);

    const findLike = await Like.findOne({
      where: {
        placeId: placeId,
        userId: userId,
      },
    });

    let likedStatus = findLike ? true : false;

    res.status(200).send(likedStatus);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/single", async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    const place = await Place.findOne({ where: { id: id }, include: Image });

    res.status(200).send(place);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { content } = req.query;

    const place = await Place.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + content + "%",
        },
      },
      include: Image,
    });

    res.status(200).send(place);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  singleUpload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    } else {
      try {
        // const { errors, isValid } = validateAddPlaceInput(req.body);
        // if (!isValid) {
        //   return res.status(400).json(errors);
        // }

        const { name, address, desc } = req.body;
        const userId = req.decoded.id; //If we want to store userId
        console.log(userId);

        console.log(req.file.transforms[0].location);

        const newPlace = await Place.create({
          name: name,
          address: address,
          summary: desc,
          userId: userId,
        });

        const newImage = await Image.create({
          link: req.file.transforms[0].location,
          placeId: newPlace.id,
        });

        const placeToReturn = await Place.findOne({
          where: { id: newPlace.id },
          include: Image,
          // include: User,
        });
        res.status(200).send(placeToReturn);
      } catch (err) {
        console.log(err);
        res.status(400).send("Some error occured");
      }
    }
  });
});

router.get("/sort", async (req, res, next) => {
  try {
    const { sortType, whichWay, ids } = req.query;
    //sortType given Places column, we want to sort by: name, createdAt, updatedAt
    //sortType can be given other sorting type: likes, comments
    //whichWay indicates which way to sort: ASC, DESC

    // const place = await Place.findOne({ where: { id: id }, include: Image });

    if (sortType == "likes") {
      const places = await Place.findAll({
        where: {
          id: { [Op.in]: ids },
        },
        attributes: [
          "id",
          "name",
          "address",
          "summary",
          [
            literal(
              `(SELECT COUNT(*) FROM "likes" WHERE "placeId" = Place.id)`
            ),
            `"PostCount"`,
          ],
        ],
        order: [[literal(`"PostCount"`), whichWay]],
        include: [Image],
      });
      res.status(200).send(places);
    } else if (sortType == "comments") {
      const places = await Place.findAll({
        where: {
          id: { [Op.in]: ids },
        },
        attributes: [
          "id",
          "name",
          "address",
          "summary",
          [
            literal(
              `(SELECT COUNT(*) FROM "comments" WHERE "placeId" = Place.id)`
            ),
            `"PostCount"`,
          ],
        ],
        order: [[literal(`"PostCount"`), whichWay]],
        include: [Image],
      });
      res.status(200).send(places);
    } else {
      const places = await Place.findAll({
        where: {
          id: { [Op.in]: ids },
        },
        order: [[sortType, whichWay]],
        include: Image,
      });
      res.status(200).send(places);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
});

router.get("/filter", async (req, res, next) => {
  const { content } = req.query;
  //content are from a predefined set:
  //["Bronx", "Brooklyn", "Queens", "Manhattan", "Staten Island"]
  //Granted not all addresses have the borough in them

  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

  console.log("CONTENT", content);

  const allPlaces = await Place.findAll({
    include: Image,
  });

  if (content === "") {
    return res.status(200).send(allPlaces);
  }

  let resPlaces = [];

  for (let i = 0; i < allPlaces.length; ++i) {
    const place = allPlaces[i];

    try {
      let res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          place.address.replace(" ", "+") +
          "&key=AIzaSyCVPTG5ZTA0E6LEpfp_9rRNDS0H8xv2Y4g"
      );

      const lt = res.data.results[0].geometry.location.lat;
      const ln = res.data.results[0].geometry.location.lng;

      res = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lt +
          "," +
          ln +
          "&key=AIzaSyCVPTG5ZTA0E6LEpfp_9rRNDS0H8xv2Y4g"
      );

      console.log(res.data.results[0].address_components[3].long_name);

      if (res.data.results[0].address_components[3].long_name == content) {
        console.log("Hi");
        resPlaces.push(place);
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(resPlaces);

  res.status(200).send(resPlaces);
});

module.exports = router;
