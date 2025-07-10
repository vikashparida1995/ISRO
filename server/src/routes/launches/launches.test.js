const {request} = require('jest');
const app = require('../../app'); 


describe('GET /launches-api/launches', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/launches-api/launches');
    expect(res.statusCode).toBe(200);
  });
});

describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028"
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f"
  };

  test('It should response with 201 created', async () => {
    const response = await request(app)
      .post('/launches-api/launches')
      .send(completeLaunchData);
     expect('Content-Type', /json/);
    expect(200)
  });

  test('It should catch missing required properties', async () => {
    const response = await request(app)
      .post('/launches-api/launches')
      .send(launchDataWithoutDate);
     expect('Content-Type', /json/);
    expect(400)
  });

  test('It should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches-api/launches')
      .send({
        ...completeLaunchData,
        launchDate: "not-a-date"
      });
     expect('Content-Type', /json/);
    expect(400)
  });
});


