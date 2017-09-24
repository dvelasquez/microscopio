var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Request unit tests:', () => {
    it('Should create a Request instance', (done: Function) => {
        api.post('/requests').send({
            email: 'test',
            url: 'test',
            matchedUrl: 'test'
        }).expect(200, done);
    });
});
