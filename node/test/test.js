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

//verify test (CHANGE TOKEN EVERY HOUR)
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmllbCIsInByaXZlbGVnZSI6IkFkbWluIiwiaWF0IjoxNTUzMjE4NTU4LCJleHAiOjE1NTMyMjIxNTh9.4fEDPJCitdmqYB94aZZlwE8oV3UlJ2lT8GJcO5ViTjg";
describe('/GET verify token for valid token', () => {
    it('it should GET authentication and userdata', (done) => {
        chai.request(server)
            .get('/verify')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(true);
                done();
            });
    });
});
describe('/GET verify token for invalid token', () => {
    it('it should not GET authentication and userdata', (done) => {
        chai.request(server)
            .get('/verify')
            .set("Authorization", "Bearer "+ "incorrecttoken")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});

//Delete user test
describe('/DELETE user with valid admin authentication', () => {
    it('it should DELETE the user successfully', (done) => {
        chai.request(server)
            .delete('/users/remove/dfhdh')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('Successfully Deleted User');
                done();
            });
    });
});
describe('/DELETE user with invalid admin authentication', () => {
    it('it should not DELETE the user', (done) => {
        chai.request(server)
            .delete('/users/remove/dfhdh')
            .set("Authorization", "Bearer "+ "invalidtoken")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.not.be.eql('Successfully Deleted User');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});

//fuel history test
describe('/GET fuel history with valid token', () => {
    it('it should GET authentication and array of data', (done) => {
        chai.request(server)
            .get('/fuelhistory')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
});
describe('/GET fuel history with invalid token', () => {
    it('it should GET authentication false and no array', (done) => {
        chai.request(server)
            .get('/fuelhistory')
            .set("Authorization", "Bearer "+ 'invalidtoken')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});

//get user info test
describe('/GET user info with valid token', () => {
    it('it should GET authentication and array of data', (done) => {
        chai.request(server)
            .get('/users/data')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(true);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
});
describe('/GET user info with invalid token', () => {
    it('it should GET authentication false and no array', (done) => {
        chai.request(server)
            .get('/users/data')
            .set("Authorization", "Bearer "+ 'invalidtoken')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});