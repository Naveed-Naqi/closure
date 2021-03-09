const express = require("express");
const router = express.Router();
const { Place, Image } = require("../database/models");

//login
router.get("/", async (req, res, next) => {
  try {
    const places = await Place.findAll({ include: Image });
    res.status(200).send(places);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.get("/single", async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    const place = await Place.findOne({ where: { id: id } });

    res.status(200).send(place);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

module.exports = router;
