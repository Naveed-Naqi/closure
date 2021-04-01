const request = require('supertest')
const app = require('./app')
describe('Post Comment', () => {
  it('should create a new comment', async () => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "This place is wild",
        placeId: 2,
        userId: 1,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.content).toBe("This place is wild");
    expect(res.body.placeId).toBe(2);
    expect(res.body.userId).toBe(1);
  })
})

describe('Post Comment Reply', () => {
  it('should create a new comment reply', async () => {
    const res = await request(app)
      .post('/api/comments/')
      .send({
        content: "Is it tho",
        placeId: 2,
        userId: 1,
        replyId: 2,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.content).toBe("Is it tho");
    expect(res.body.placeId).toBe(2);
    expect(res.body.userId).toBe(1);
    expect(res.body.replyId).toBe(2);
  })
})