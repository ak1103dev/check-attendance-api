const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect');
const app = require('../../../src/app');
const types = require('../../../src/utils/dataTypes');
const { User } = require('../../../src/models/');

chai.use(chaiHttp);
const request = chai.request(app);

describe('POST /users', () => {
  before((done) => {
    User.remove({}).then(() => done());
  });

  it('should return user when registered', (done) => {
    const reqBody = {
      email: 'test123@test.com',
      firstName: 'First',
      lastName: 'Last',
      password: '12345',
    };
    const expectedResBody = {
      _id: types.mongoId,
      email: 'test123@test.com',
      name: {
        first: 'First',
        last: 'Last',
      },
      password: undefined,
    };
    request.post('/users')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toMatch(expectedResBody._id);
        expect(res.body.email).toEqual(expectedResBody.email);
        expect(res.body.name).toEqual(expectedResBody.name);
        expect(res.body.password).toEqual(expectedResBody.password);
        done();
      });
  });

  it('should return error when send invalid data', (done) => {
    const reqBody = {
      email: 'xxx',
      firstName: 20,
      lastName: 10,
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
        expect(res.body.error.message).toEqual(expectedResBody.error.message);
        done();
      });
  });

  it('should return error when email already exist', (done) => {
    const reqBody = {
      email: 'test123@test.com',
      firstName: 'First',
      lastName: 'Last',
      password: '12345',
    };
    const expectedResBody = {
      error: {
        message: 'This email already exist',
      },
    };
    request.post('/users')
      .send(reqBody)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.error.message).toEqual(expectedResBody.error.message);
        done();
      });
  });
});
