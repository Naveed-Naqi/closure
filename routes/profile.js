const express = require("express");
const router = express.Router();
const { Place, Comment, Image } = require("../database/models");

router.get("/comments", async (req, res, next) => {
  try {
    const { id } = req.query;

    const comments = await Comment.findAll({
      where: {
        userId: id,
      },
      include: Place,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get("/likes", async (req, res, next) => {
//   try {
//     const { id } = req.query;

//     const likes = await Like.findAll({
//       where: {
//         userId: id,
//       },
//       include: Place,
//       order: [["createdAt", "DESC"]],
//     });

//     res.status(200).send(likes);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
module.exports = router;
