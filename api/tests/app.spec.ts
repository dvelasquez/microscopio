var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('App unit tests:', () => {
    it('Should create a App instance', (done: Function) => {
        api.post('/apps').send({
            name: 'test',
            confidence: 'test',
            version: 'test',
            icon: 'test',
            website: 'test'
        }).expect(200, done);
    });
});
