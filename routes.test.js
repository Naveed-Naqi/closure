const request = require('supertest')
const app = require('./app')
const Comment = require('./database/models/comment')

/* Comments Test */

let deletable1;
let deletable2;

describe('Post Comment', () => {
  it('should create a new comment', async (done) => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This is a test comment deleted",
        placeId: 2,
        userId: 1,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.content).toBe("This is a test comment deleted");
    expect(res.body.placeId).toBe(2);
    expect(res.body.userId).toBe(1);

    const newPost = await Comment.findOne({
      where: {
        content: "This is a test comment deleted",
        placeId: 2,
        userId: 1,
      },
    })
    expect(newPost).toBeTruthy()
    deletable1 = newPost.id
    console.log(newPost.id)
    console.log(newPost.content)
    console.log("yer")
    done();
  })
})

describe('Post Comment Reply', () => {
  it('should create a new comment reply', async (done) => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This is a test reply",
        placeId: 2,
        userId: 1,
        replyId: deletable1,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.content).toBe("This is a test reply");
    expect(res.body.placeId).toBe(2);
    expect(res.body.userId).toBe(1);
    expect(res.body.replyId).toBe(deletable1);

    const newReply = await Comment.findOne({
      where: {
        content: "This is a test reply",
        placeId: 2,
        userId: 1,
        replyId: deletable1,
      },
    })
    expect(newReply).toBeTruthy()
    deletable2 = newReply.id
    done();
  })
})

describe('Delete Comment', () => {
  it('should delete a comment', async (done) => {
    const res = await request(app)
      .delete('/api/comments/remove')
      .query({
        id: deletable2,
      })
    expect(res.statusCode).toEqual(200)

    const res2 = await request(app)
      .delete('/api/comments/remove')
      .query({
        id: deletable1,
      })
    expect(res2.statusCode).toEqual(200)
    done();
  })
})


/* Places Test */