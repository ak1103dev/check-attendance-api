const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect');
const app = require('../../../src/app');
const types = require('../../../src/utils/dataTypes');
const { User } = require('../../../src/models/');

chai.use(chaiHttp);
const request = chai.request(app);

describe('POST /users/login', () => {
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
          .end(() => done());
      });
  });

  it('should return access token when logged in', (done) => {
    const reqBody = {
      email: 'test123@test.com',
      password: '12345',
    };
    const expectedResBody = {
      token: types.accessToken,
    };
    request.post('/users/login')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.token).toMatch(expectedResBody.token);
        done();
      });
  });

  it('should return error when send invalid data', (done) => {
    const reqBody = {
      email: 'xxx',
      password: 15,
    };
    const expectedResBody = {
      error: {
        message: 'Invalid data',
      },
    };
    request.post('/users')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(expectedResBody.message);
        done();
      });
  });

  it('should return error when send incorrect email', (done) => {
    const reqBody = {
      email: 'test@test.com',
      password: '12345',
    };
    const expectedResBody = {
      error: {
        message: 'Email or password is incorrect',
      },
    };
    request.post('/users')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(expectedResBody.message);
        done();
      });
  });

  it('should return error when send incorrect email', (done) => {
    const reqBody = {
      email: 'test123@test.com',
      password: 'gggtest',
    };
    const expectedResBody = {
      error: {
        message: 'Email or password is incorrect',
      },
    };
    request.post('/users')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(expectedResBody.message);
        done();
      });
  });
});
