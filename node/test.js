'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('./index.js');

describe('Check users', function () {
    it('should return user', function () {
        return chai.request(app)
            .get('/users/check?username=' + 'Daniel')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });
});