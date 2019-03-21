let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)


// Check user
describe('/GET username for existing user: Daniel', () => {
    it('it should GET the username', (done) => {
        chai.request(server)
            .get('/users/check?username=Daniel')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].username.should.be.eql('Daniel');
                //res.body.data.length.should.be.eql(1);
                //res.body.length.should.be.eql(0);
                done();
            });
    });
});

describe('/GET username for non-existing user: TestingAcc', () => {
    it('it should GET an empty data result', (done) => {
        chai.request(server)
            .get('/users/check?username=TestingAcc')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
                //res.body.length.should.be.eql(0);
                done();
            });
    });
});


// login test
let user = {
    username: 'Daniel',
    password: '1234'
};

let invalidUser = {
    username: 'svfdgdf',
    password: '12345'
};

describe('/POST login for a valid user', () => {
    it('it should login', (done) => {
        chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(true);
                (res.body.token === null).should.be.false;
                done();
            });
    });
});

describe('/POST login for a invalid user', () => {
    it('it should be invalid login', (done) => {
        chai.request(server)
            .post('/login')
            .send(invalidUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                (res.body.token === null).should.be.true;
                done();
            });
    });
});