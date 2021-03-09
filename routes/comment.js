const express = require("express");
const router = express.Router();
const { Comment } = require("../database/models");

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.get("/single", async (req, res, next) => {
  try {
    const { placeId } = req.query;
    console.log(placeId);

    const comments = await Comment.findOne({
      where: {
        placeId: placeId,
      },
    });
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.delete("/remove", async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    const findComment = await Comment.findOne({
      where: {
        id: id,
      },
    });

    if (findComment !== null) {
      const comments = await Comment.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).send("deleted");
    } else {
      res.status(200).send("comment does not exist");
    }
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { content, placeId, userId, replyId } = req.body;
    console.log(content);

    if (replyId == undefined) {
      let newComment = Comment.build({
        content: content,
        placeId: placeId,
        userId: userId,
      });

      newComment
        .save()
        .then((comment) => {
          return res.status(200).json(comment);
        })
        .catch((err) => {
          return res.status(400).json("Error occured");
        });
    } else {
      let newComment = Comment.build({
        content: content,
        placeId: placeId,
        userId: userId,
        replyId: replyId,
      });

      newComment
        .save()
        .then((comment) => {
          return res.status(200).json(comment);
        })
        .catch((err) => {
          return res.status(400).json("Error occured");
        });
    }
  } catch (err) {
    res.status(400).send("Some error occured");
  }
});

module.exports = router;
