const express = require("express");
const router = express.Router();
const { Comment, User, Reply } = require("../database/models");
const checkAuth = require("./middleware/checkAuth.js");

router.get("/", async (req, res, next) => {
  try {
    const { placeId } = req.query;

    const comments = await Comment.findAll({
      where: {
        placeId: placeId,
      },
      include: [
        User,
        { model: Reply, include: User, order: [["createdAt", "DESC"]] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", checkAuth, async (req, res, next) => {
  try {
    const { content, placeId, commentId } = req.body;
    const userId = req.decoded.id;

    if (commentId) {
      const newComment = await Reply.create({
        content: content,
        placeId: placeId,
        userId: userId,
        commentId: commentId,
      });

      const commentToReturn = await Reply.findOne({
        where: { id: newComment.id },
        include: User,
      });

      res.status(200).send(commentToReturn);
    } else {
      const newComment = await Comment.create({
        content: content,
        placeId: placeId,
        userId: userId,
      });

      const commentToReturn = await Comment.findOne({
        where: { id: newComment.id },
        include: User,
      });

      res.status(200).send(commentToReturn);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
});

router.get("/single", async (req, res, next) => {
  try {
    const { placeId, commentId } = req.query;
    console.log(placeId);

    const comments = await Comment.findOne({
      where: {
        placeId: placeId,
        id: commentId,
      },
    });
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

// router.delete("/remove", async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     console.log(id);

//     const findComment = await Comment.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (findComment !== null) {
//       const comments = await Comment.destroy({
//         where: {
//           id: id,
//         },
//       });

//       res.status(200).send("deleted");
//     } else {
//       res.status(400).send("comment does not exist");
//     }
//   } catch (err) {
//     res.status(400).send("Some error occured");
//   }
// });

module.exports = router;
