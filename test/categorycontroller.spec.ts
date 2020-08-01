import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
var should = chai.should();
const expect = chai.expect;
let server = require('../src/server')

describe('Test Case Get Category Controller', () => {

    it("Should be return array", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/data/categories")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array')          
            done()
        })
    });

    it("should have length 8", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/data/categories")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(8)
            done()
        })
    });

    
    it("should have following parameter id, colour , title", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/data/categories")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('colour');
            res.body[0].should.have.property('title');
            done()
        })
    });
});