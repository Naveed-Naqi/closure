const express = require("express");
const router = express.Router();
const { Place, Comment, Image, Like } = require("../database/models");
const checkAuth = require("./middleware/checkAuth");

router.get("/comments", checkAuth, async (req, res, next) => {
  try {
    const id = req.decoded.id;

    const comments = await Comment.findAll({
      where: {
        userId: id,
      },
      include: { model: Place, include: Image },
      order: [["createdAt", "DESC"]],
    });

    let places = comments.map((elem) => elem.place);
    places = Array.from(new Set(places.map((a) => a.id))).map((id) => {
      return places.find((a) => a.id === id);
    });

    res.status(200).send(places);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/likes", checkAuth, async (req, res, next) => {
  try {
    const id = req.decoded.id;

    const likes = await Like.findAll({
      where: {
        userId: id,
      },
      include: { model: Place, include: Image },
      order: [["createdAt", "DESC"]],
    });

    let places = likes.map((elem) => elem.place);
    places = Array.from(new Set(places.map((a) => a.id))).map((id) => {
      return places.find((a) => a.id === id);
    });

    res.status(200).send(places);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
