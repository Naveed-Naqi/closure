const { expect } = require('chai');
const request = require('supertest')
const app = require('./app')
const Comment = require('./database/models/comment')





/************ Comments Test ************/





let deletable1;

/*
  Checks if we can post a comment, and that the 
  comment that was created matches our test post.
*/
describe('Post Comment', () => {
  it('should create a new comment', async (done) => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This is a test comment",
        placeId: 2,
        userId: 1,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body.content).to.equal("This is a test comment");
    expect(res.body.placeId).to.equal(2);
    expect(res.body.userId).to.equal(1);

    const newPost = await Comment.findOne({
      where: {
        content: "This is a test comment",
        placeId: 2,
        userId: 1,
      },
    })
    expect(newPost).ok
    deletable1 = newPost.id
    done();
  })
})

/*
  Checks if we can delete the comment that 
  we created in the previous test.
*/
describe('Delete A Comment', () => {
  it('should delete the comment created in a prior test', async (done) => {
    const res = await request(app)
      .delete('/api/comments/remove')
      .query({
        id: deletable1,
      })
    expect(res.statusCode).to.equal(200)
    done();
  })
})

/*
  Checks if we can try to delete the same comment we just deleted.
*/
describe('Delete A Comment Again', () => {
  it('should try (and fail) to delete one of the two comments from previous', async (done) => {
    const res = await request(app)
      .delete('/api/comments/remove')
      .query({
        id: deletable1,
      })
    expect(res.statusCode).to.equal(400)
    done();
  })
})

/*
  Checks if we can post a comment with an invalid userId.
*/
describe('Post Comment With UserId 0', () => {
  it('should try (and fail) to create a new comment with a non-existent userId', async (done) => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This comment should not be here",
        placeId: 2,
        userId: 0,
      })
    expect(res.statusCode).to.equal(400)
    done();
  })
})

/*
  Checks if we can post a comment with an invalid placeId.
*/
describe('Post Comment With PlaceId 0', () => {
  it('should try (and fail) to create a new comment with a non-existent placeId', async (done) => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This comment should not be here",
        placeId: 0,
        userId: 1,
      })
    expect(res.statusCode).to.equal(400)
    done();
  })
})

/*
  Checks if we can get all of the comments for a given place. If so,
  then there should be a promise that is returned, whether there are
  comments or not.
*/
describe('Get Comments For A Single Place', () => {
  it('should get all comments for a particular placeId', async (done) => {
    const res = await request(app)
      .get('/api/comments/')
      .query({
        placeId: 2,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body).to.exist;
    done();
  })
})

/*
  Checks if we can get all of the comments for a non-existent place. 
  If so, then there should be a promise that is returned with no
  comments in it.
*/
describe('Get Comments For A Single Place with placeId 0', () => {
  it('should try (and fail) to get the comments for a place with placeId 0', async (done) => {
    const res = await request(app)
      .get('/api/comments/')
      .query({
        placeId: 0,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body[0]).to.not.exist;
    done();
  })
})





/************ Places Test ************/





/*
  Checks if we can get the information a given place. If so,
  then the placeId of the received place should be the same 
  as the place we attempted to receive.
*/
describe('Get A Single Place', () => {
  it('should get a single place', async (done) => {
    const res = await request(app)
      .get('/api/places/single')
      .query({
        id: 2,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body.id).to.equal(2)
    done();
  })
})

/*
  Checks if we can get the information a non-existent place. If so,
  then the placeId of the received object should not exist.
*/
describe('Get A Single Place with placeId 0', () => {
  it('should try (and fail) to get a place with placeId 0', async (done) => {
    const res = await request(app)
      .get('/api/places/single')
      .query({
        id: 0,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body.id).to.not.exist;
    done();
  })
})





/************ Likes Test ************/





/*
  Checks if we can get the likes of a given place. If so,
  then the request should return a number of at least 0.
*/
describe('Get Likes For A Single Place', () => {
  it('should get the likes for a single place', async (done) => {
    const res = await request(app)
      .get('/api/likes/')
      .query({
        placeId: 2,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body).to.exist;
    done();
  })
})

/*
  Checks if we can get the likes of a non-existent place. 
  The request should always return a number of 0.
*/
describe('Get Likes For A Single Place with placeId 0', () => {
  it('should try (and fail) to get the likes for a place with placeId 0', async (done) => {
    const res = await request(app)
      .get('/api/likes/')
      .query({
        placeId: 0,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body).to.equal(0);
    done();
  })
})





/************ Profile Test ************/





/*
  Checks if we can get all of the comments for a given user. If so,
  then there should be a promise that is returned, whether there are
  comments or not.
*/
describe('Get Comments For A Single User', () => {
  it('should get the likes for a single place', async (done) => {
    const res = await request(app)
      .get('/api/profile/comments/')
      .query({
        id: 1,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body).to.exist;
    done();
  })
})

/*
  Checks if we can get all of the comments for a non-existent user. 
  If so, then there should be a promise that is returned, with no
  comments in it.
*/
describe('Get Comments For A Single User with userId 0', () => {
  it('should try (and fail) to get the comments for a user with userId 0', async (done) => {
    const res = await request(app)
      .get('/api/profile/comments/')
      .query({
        id: 0,
      })
    expect(res.statusCode).to.equal(200)
    expect(res.body[0]).to.not.exist;
    done();
  })
})