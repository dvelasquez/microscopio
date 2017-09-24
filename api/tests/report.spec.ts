var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Report unit tests:', () => {
    it('Should create a Report instance', (done: Function) => {
        api.post('/reports').send({
            url: 'test',
            originalUrl: 'test'
        }).expect(200, done);
    });
});
