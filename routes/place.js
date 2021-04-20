const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Place, Image, Like, Comment } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");

//login
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
  try {
    const { name, address, summary } = req.body;
    const userId = req.decoded.id; //If we want to store userId

    
    const newPlace = await Place.create({
      name: name,
      address: address,
      summary: summary,
    });

    const placeToReturn = await Place.findOne({
      where: { id: newPlace.id },
      // include: User,
    });

    res.status(200).send(placeToReturn);
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
});

router.get("/sort", async (req, res, next) => {
  try {
    const { sortType, whichWay } = req.query;
    //sortType given Places column, we want to sort by: name, createdAt, updatedAt
    //sortType can be given other sorting type: likes, comments
    //whichWay indicates which way to sort: ASC, DESC

    // const place = await Place.findOne({ where: { id: id }, include: Image });
    
    if (sortType == "likes") {
      const places = await Like.findAll({
        attributes: [
          'Places.*',[Op.fn('count', self.Op.col("placeId")), 'count'],
        ],
        include: [
          {
            model: Place,
            as: 'Places',
          },
          Image,
        ],
        order: [
          ['count', 'DESC'],
        ],
      });
      res.status(200).send(places);
    }
    else {
      const places = await Place.findAll({
        order: [
          [sortType, whichWay],
        ],
        include: Image,
      });
      res.status(200).send(places);
    }

  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.get("/filter", async (req, res, next) => {
  try {
    const { content } = req.query;
    //content are from a predefined set:
    //["Bronx", "Brooklyn", "Queens", "Manhattan", "SI"]
    //Granted not all addresses have the borough in them

    const place = await Place.findAll({
      where: {
        address: {
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

module.exports = router;
