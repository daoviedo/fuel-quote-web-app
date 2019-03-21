let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)


// Check user
const usernames = ['Daniel', 'Shahzaib', 'Joely', 'Coogs-Uh'];
for (let x = 0; x < usernames.length; x++) {
    describe('/GET username', () => {
        it('it should GET the username', (done) => {
            chai.request(server)
                .get('/users/check?username=' + usernames[x])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    //res.body.data.length.should.be.eql(1);
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
}

// login test
let user = {
    username: 'Daniel',
    password: '1234'
};

describe('/POST login', () => {
    it('it should login', (done) => {
        chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('authentication');
                res.body.should.have.property('token');
                done();
            });
    });
});