const express = require("express");
const router = express.Router();
const { Place } = require("../database/models");

//login
router.get("/", async (req, res, next) => {
  try {
    const places = await Place.findAll();
    res.status(200).send(places);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

module.exports = router;
