var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Auth unit tests:', () => {
    it('Should create a Auth instance', (done: Function) => {
        api.post('/Auths').send({}).expect(200, done);
    });
});
