import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
var should = chai.should();
const expect = chai.expect;
let server = require('../src/server')

describe('Test Case Feed Controller', () => {

    it("Feed should be return array, refresh API", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/ngrok1/667/ios/refresh")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array')    
            done()
        })
    });

    it("should have following parameter id, enqueued,ordinal,url,published,categories,credits,title", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/ngrok1/667/ios/refresh")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('enqueued');
            res.body[0].should.have.property('ordinal');
            res.body[0].should.have.property('url');
            res.body[0].should.have.property('published');
            res.body[0].should.have.property('categories');
            res.body[0].should.have.property('credits');
            res.body[0].should.have.property('title');
            done()
        })
    });

    it("Feed should be return array, refresh API with ordinal", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/ngrok1/667/ios/refresh/2597")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('array')    
            done()
        })
    });

    it("should have following parameter id, enqueued,ordinal,url,published,categories,credits,title", function(done) {
        chai.request("http://localhost:3000")
        .get("/feed/ngrok1/667/ios/refresh/2597")
        .end(function (err, res) {
            if (err) done(err);
            expect(res.status).to.equal(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('enqueued');
            res.body[0].should.have.property('ordinal');
            res.body[0].should.have.property('url');
            res.body[0].should.have.property('published');
            res.body[0].should.have.property('categories');
            res.body[0].should.have.property('credits');
            res.body[0].should.have.property('title');
            done()
        })
    });

    
    
    // it("Feed should be return array, refresh API", function(done) {
    //     chai.request("http://localhost:3000")
    //     .get("/feed/ngrok1/667/ios/refresh")
    //     .end(function (err, res) {
    //         if (err) done(err);
    //         expect(res.status).to.equal(200);
    //         expect(res.body).to.be.a('array')    
    //         done()
    //     })
    // });

    
});