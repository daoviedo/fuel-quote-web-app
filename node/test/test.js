let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp)

describe('/GET username', () => {
    it('it should GET the username', (done) => {
      chai.request(server)
          .get('/users/check?username=sdfsfg')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
          });
    });
});