let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)

const usernames = ['Daniel', 'Shahzaib', 'Joely'];

for (let x = 0; x < usernames.length; x++) {
    describe('/GET username', () => {
        it('it should GET the username', (done) => {
            chai.request(server)
                .get('/users/check?username=' + usernames[x])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    //res.body.data.length.should.be.eql(1);
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
}
