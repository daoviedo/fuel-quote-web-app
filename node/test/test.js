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
let updatedUserInfo = {
    username: 'Daniel',
    firstname: 'Danny',
    lastname:'oviedo',
    ad1: 'address1',
    ad2: 'address2',
    city: 'mcity',
    st: 'TX',
    zip: '77477'
}
let newUserInfo = {
    username: 'testUser',
    pass: '1234',
    fname: 'testName',
    lname:'Test',
    ad1: 'address1',
    ad2: 'address2',
    city: 'mcity',
    st: 'TX',
    zip: '77477',
    priv: 'user'
}
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
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbmllbCIsInByaXZlbGVnZSI6IkFkbWluIiwiaWF0IjoxNTUzMjgxMjQwLCJleHAiOjE1NTMyODQ4NDB9.5z4VVP1g5JAxQq8OG5-qo5EvekRXo4-9_f11emPtVwE";
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

//get all users test
describe('/GET all users with valid token and admin', () => {
    it('it should GET authentication and array of data', (done) => {
        chai.request(server)
            .get('/users')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
});
describe('/GET all users with invalid token or not admin', () => {
    it('it should GET authentication false and no array', (done) => {
        chai.request(server)
            .get('/users')
            .set("Authorization", "Bearer "+ 'invalidtoken')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});

//get user info for fuelrequest
describe('/GET user info for fuelrequest with valid token', () => {
    it('it should GET authentication and array of data', (done) => {
        chai.request(server)
            .get('/users/fuelrequestinfo')
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
    });
});
describe('/GET user info for fuelrequest with invalid token', () => {
    it('it should GET authentication false and no array', (done) => {
        chai.request(server)
            .get('/users/fuelrequestinfo')
            .set("Authorization", "Bearer "+ 'invalidtoken')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.authentication.should.be.eql(false);
                done();
            });
    });
});

//Checking to make sure that when you update a user the users firstname is updated
describe('/PATCH user info should be updated', () => {
    it('it should UPDATE the users info with the new info', (done) => {
        chai.request(server)
            .patch('/users/update')
            .send(updatedUserInfo)
            .set("Authorization", "Bearer "+ token)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('Successfully Updated User');
                done();
            });
    });
});

//aduser
describe('/PATCH user info should be updated', () => {
    it('it should add the test user info', (done) => {
        chai.request(server)
            .post('/users/adduser')
            .send(newUserInfo)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('Successfully Added User');
                done();
            });
    });
});

//add request