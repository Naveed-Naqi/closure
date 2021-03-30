const express = require("express");
const router = express.Router();
const { Like, User } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");

router.get("/", async (req, res, next) => {
  try {
    const { placeId } = req.query;
    console.log(placeId);

    const likes = await Like.findAndCountAll({
      where: {
        placeId: placeId,
      },
      include: User,
    });

    res.status(200).send(likes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/remove", async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    const findLike = await Like.findOne({
      where: {
        id: id,
      },
    });

    if (findLike !== null) {
      const likes = await Like.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).send("unliked");
    } else {
      res.status(400).send("like does not exist");
    }
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  try {
    const userId = req.decoded.id;
    const { status, placeId } = req.body;

    const newLike = await Like.create({
      favorite: status,
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
