let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)


describe('Fuel Request Unit Test', () => {
    let TestUserToken = null;
    let AdminToken = null;
    let ValidAdmin = {
        username: 'Daniel',
        password: '1234'
    };
    let ValidUser = {
        username: 'TestUser',
        password: 'Test'
    };
    let invalidUser = {
        username: 'svfdgdf',
        password: '12345'
    };
    let TestUserInfo = {
        username: 'TestUser',
        pass: 'Test',
        fname: 'Testfname',
        lname:'Testlname',
        ad1: 'Testad1',
        ad2: 'Testad2',
        city: 'Testcity',
        st: 'Tt',
        zip: '00000',
        priv: 'user'
    }
    let TestFuelRequest = {
        GallonsRequested: 10, 
        PricePerGallon: 15, 
        DeliveryDate: new Date(), 
        ad1: TestUserInfo.ad1, 
        city: TestUserInfo.city, 
        st: TestUserInfo.st, 
        zip: TestUserInfo.zip, 
        OrderID: Math.floor(Math.random() * 1000000)
        
    }
    
    //test for the check to see if username is available
    describe('/GET test:existing user: Daniel', () => {
        it('it should GET the username', (done) => {
            chai.request(server)
                .get('/users/check?username=Daniel')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data[0].username.should.be.eql('Daniel');
                    done();
                });
        });
    });

    //test for the check to see if username is available
    describe('/GET test: nonexisting user: TestUser', () => {
        it('it should GET an empty data result', (done) => {
            chai.request(server)
                .get('/users/check?username=TestingUser')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    //test to see if the user is successfully added to the Database
    describe('/POST user should be created: TestUser', () => {
        it('it should add the test user info', (done) => {
            chai.request(server)
                .post('/users/adduser')
                .send(TestUserInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('Successfully Added User');
                    done();
                });
        });
    });
    
    //test to see if an existing user is entered into users table
    describe('/POST user should not be created: TestUser', () => {
        it('it should not add the test user info', (done) => {
            chai.request(server)
                .post('/users/adduser')
                .send(TestUserInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.errno.should.be.eql(1062);
                    done();
                });
        });
    });

    //test for login
    describe('/POST login for a valid user', () => {
        it('it should login', (done) => {
            chai.request(server)
                .post('/login')
                .send(ValidUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.authentication.should.be.eql(true);
                    (res.body.token === null).should.be.false;
                    TestUserToken=res.body.token;
                    done();
                });
        });
    });

    //test for login
    describe('/POST login for a valid administrator', () => {
        it('it should login', (done) => {
            chai.request(server)
                .post('/login')
                .send(ValidAdmin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.authentication.should.be.eql(true);
                    (res.body.token === null).should.be.false;
                    AdminToken=res.body.token;
                    done();
                });
        });
    });

    //test for login
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

    //test for verify
    describe('/GET verify token for valid token', () => {
        it('it should GET authentication and userdata', (done) => {
            chai.request(server)
                .get('/verify')
                .set("Authorization", "Bearer "+ TestUserToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.authentication.should.be.eql(true);
                    done();
                });
        });
    });

    //test for verify
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

    //test for updating user info
    TestUserInfo.fname="TestUpdateFname";
    describe('/PATCH user info should be updated', () => {
        it('it should UPDATE the users info with the new info', (done) => {
            chai.request(server)
                .patch('/users/update')
                .send(TestUserInfo)
                .set("Authorization", "Bearer "+ TestUserToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('Successfully Updated User');
                    done();
                });
        });
    });

    //testing for recieving fuel history
    describe('/GET fuel history with valid token', () => {
        it('it should GET authentication and array of data', (done) => {
            chai.request(server)
                .get('/fuelhistory')
                .set("Authorization", "Bearer "+ TestUserToken)
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

    //testing for recieving fuel history
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

    //testing for getting user Data of the user
    describe('/GET user info with valid token', () => {
        it('it should GET authentication and array of data', (done) => {
            chai.request(server)
                .get('/users/data')
                .set("Authorization", "Bearer "+ TestUserToken)
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

    //testing for getting user Data of the user
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

    //testing for getting all users 
    describe('/GET all users with valid token and admin', () => {
    it('it should GET authentication and array of data', (done) => {
        chai.request(server)
            .get('/users')
            .set("Authorization", "Bearer "+ AdminToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                (res.body.data.length==0).should.be.eql(false)
                done();
            });
        });
    });

    describe('/GET all users with invalid token or not admin', () => {
        it('it should GET authentication false and no array', (done) => {
            chai.request(server)
                .get('/users')
                .set("Authorization", "Bearer "+ TestUserToken)
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
            .set("Authorization", "Bearer "+ TestUserToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                done();
            });
        });
    });

    //testing for adding a valid user fuel request
    describe('/POST fuel request is added to the fuel history table with valid ', () => {
        it('it should post all the information of the request into the fuel request history table', (done) => {
            chai.request(server)
                .post('/users/addRequest')
                .set("Authorization", "Bearer "+ TestUserToken)
                .send(TestFuelRequest)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.text.should.be.eql('Successfully Added Request');
                    done();
                });
        });
    });

    //testing for adding a invalid user fuel request
    describe('/POST fuel request is added to the fuel history table with invalid user', () => {
        it('it should not authenticate/add request', (done) => {
            chai.request(server)
                .post('/users/addRequest')
                .set("Authorization", "Bearer "+ "TestUserToken")
                .send(TestFuelRequest)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.authentication.should.be.eql(false);
                    done();
                });
        });
    });

    //test for deleting a user
    describe('/DELETE user with valid admin authentication', () => {
        it('it should DELETE the user successfully', (done) => {
            chai.request(server)
                .delete('/users/remove/TestUser')
                .set("Authorization", "Bearer "+ AdminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('Successfully Deleted User');
                    done();
                });
        });
    });
    
    //test for deleting a user
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
})
