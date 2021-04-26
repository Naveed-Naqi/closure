const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Place, Image, Like } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");
const upload = require("./upload");

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
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    } else {
      try {
        const { name, address, summary } = req.body;
        const userId = req.decoded.id; //If we want to store userId

        const newPlace = await Place.create(
          {
            name: name,
            address: address,
            summary: summary,
            image: {
              link: req.file.transforms[0].location,
            },
          },
          {
            include: [
              {
                association: Place.Image,
              },
            ],
          }
        );
        const placeToReturn = await Place.findOne({
          where: { id: newPlace.id },
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
    const { sortType, whichWay } = req.query;
    //sortType is the column we want to sort by: name, createdAt, updatedAt
    //whichWay indicates which way to sort: ASC, DESC

    // const place = await Place.findOne({ where: { id: id }, include: Image });

    const places = await Place.findAll({
      order: [[sortType, whichWay]],
      include: Image,
    });
    res.status(200).send(places);
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
