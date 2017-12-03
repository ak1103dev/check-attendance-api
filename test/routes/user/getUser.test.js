const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect');
const app = require('../../../src/app');
const types = require('../../../src/utils/dataTypes');
const { User } = require('../../../src/models/');

chai.use(chaiHttp);
const request = chai.request(app);

let accessToken;

describe('GET /users/me', () => {
  before((done) => {
    User.remove({})
      .then(() => {
        request.post('/users')
          .send({
            email: 'test123@test.com',
            firstName: 'First',
            lastName: 'Last',
            password: '12345',
          })
          .end(() => {
            request.post('/users/login')
              .send({
                email: 'test123@test.com',
                password: '12345',
              })
              .end((err, res) => {
                accessToken = res.body.token;
                done();
              });
          });
      });
  });

  it('should return user when get user me', (done) => {
    const expectedResBody = {
      _id: types.mongoId,
      email: 'test123@test.com',
      name: {
        first: 'First',
        last: 'Last',
      },
      password: undefined,
    };
    request.get('/users/me')
      .set('X-Access-Token', accessToken)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toMatch(expectedResBody._id);
        expect(res.body.email).toEqual(expectedResBody.email);
        expect(res.body.name).toEqual(expectedResBody.name);
        expect(res.body.password).toEqual(expectedResBody.password);
        done();
      });
  });

  it('should return error when no logged in', (done) => {
    const expectedResBody = {
      error: {
        message: 'Unauthorized user',
      },
    };
    request.get('/users/me')
      .end((err, res) => {
        expect(res.status).toEqual(401);
        expect(res.body.error.message).toEqual(expectedResBody.error.message);
        done();
      });
  });
});
