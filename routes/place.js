const express = require("express");
const router = express.Router();
const { Op, literal } = require("sequelize");
const { Place, Image, Like, Comment } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");
const upload = require("./upload");
const singleUpload = upload.single("image");
const axios = require('axios')

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
        const { name, address, desc } = req.body;
        //const userId = req.decoded.id; //If we want to store userId

        console.log(req.file.transforms[0].location);

        // const {existingAddress} = await axios.get(
        //   "https://maps.googleapis.com/maps/api/geocode/json?address="+ address.replace(' ','+') +"&key=YOUR_API_KEY"
        // )

        // if(name.length() > 50){
        //   console.log("Name of restaurant is too long");
        //   res.status(400).send("Name of restaurant is too long");
        // }
        // else if(name.length() < 3){
        //   console.log("Name of restaurant is too short");
        //   res.status(400).send("Name of restaurant is too short");
        // }
        // else if(address.length() < 6){
        //   console.log("Address is too short");
        //   res.status(400).send("Address is too short");
        // }
        // else if(existingAddress[0].partial_match) {
        //   console.log("Address is either not specfic enough or does not exist");
        //   res.status(400).send("Address is either not specfic enough or does not exist");
        // }
        // else if(desc.length() > 150){
        //   console.log("Description is too long");
        //   res.status(400).send("Description is too long");
        // }
        // else if(desc.length() < 20){
        //   console.log("Description is too short");
        //   res.status(400).send("Description is too short");
        // }
        // else {
        const newPlace = await Place.create({
          name: name,
          address: address,
          summary: desc,
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
        // }
      } catch (err) {
        console.log(err);
        res.status(400).send("Some error occured");
      }
    }
  });
});

router.get("/sort", async (req, res, next) => {
  try {
    const { sortType, whichWay } = req.query;
    //sortType given Places column, we want to sort by: name, createdAt, updatedAt
    //sortType can be given other sorting type: likes, comments
    //whichWay indicates which way to sort: ASC, DESC

    // const place = await Place.findOne({ where: { id: id }, include: Image });

    if (sortType == "likes") {
      const places = await Place.findAll({
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
  try {
    const { content } = req.query;
    //content are from a predefined set:
    //["Bronx", "Brooklyn", "Queens", "Manhattan", "Staten Island"]
    //Granted not all addresses have the borough in them

    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

    const allPlaces = await Place.findAll({
      include: Image,
    });

    var resPlaces = {}

    allPlaces.forEach(
      async (place) => {
        const {latlon} = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?address="+ place.dataValues.address.replace(' ','+') +"&key=YOUR_API_KEY"
        )
  
        const lt = latlon.results.geometry.location.lat
        const ln = latlon.results.geometry.location.lng
  
        const {data} = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lt +","+ ln +"&key=YOUR_API_KEY"
        )

        if(data.results.address_components[4].long_name == content) {
          resPlaces = {...resPlaces, place}
        }
      }
    )
    
    res.status(200).send(resPlaces);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
  //   try {
  //   const place = await Place.findAll({
  //     where: {
  //       address: {
  //         [Op.iLike]: "%" + content + "%",
  //       },
  //     },
  //     include: Image,
  //   });

  //   res.status(200).send(place);
  // } catch (err) {
  //   res.status(400).send("Some error occured");
  // }
});

module.exports = router;
