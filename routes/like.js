const express = require("express");
const router = express.Router();
const { Like, User } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");

router.get("/", async (req, res, next) => {
  try {
    const { placeId } = req.query;
    console.log(placeId);

    const likes = await Like.count({
      where: {
        placeId: placeId,
      },
    });

    console.log(likes);

    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete("/", checkAuth, async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { placeId } = req.body;

    console.log(placeId);

    const findLike = await Like.findOne({
      where: {
        placeId: placeId,
        userId: userId,
      },
    });

    if (findLike !== null) {
      await Like.destroy({
        where: {
          placeId: placeId,
          userId: userId,
        },
      });

      res.status(200).send("unliked");
    } else {
      console.log("Ha");
      res.status(400).send("like does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { status, placeId } = req.body;

    const newLike = await Like.create({
      placeId: placeId,
      userId: userId,
    });

    res.status(200).json(newLike);
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
});

module.exports = router;
