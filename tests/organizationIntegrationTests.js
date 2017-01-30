"use strict";


var app          = require('../app.js');
var mongoose     = require('mongoose');
var request      = require('supertest');
var should       = require('should');


var agent        = request.agent(app);
var Organization = mongoose.model('Organization');

describe('Organization REST API Test', function(){
    var organizationPost;
    var organizationPut;
    var organizationPatch;
    var organizationId;
    var servicePost;

    before(function(done){
        // initial mongodb clean up
        Organization.remove({}).exec();

        // TODO: remove to the data.json file
        servicePost = {
            name: 'Service 1',
            description: "Service description",
            lat: "",
            long: "",
            contact_email: "me@email.com",
            contact_phone: "773-124-5678",
            street_address1: "1234 N. Somewhere Ave.",
            street_address2: "",
            street_cityprovince: "Chicago",
            street_state: "ILL",
            street_postalcode: "60626",
            eligibility_desc: "Must be 18+",
            cost_desc: "Free",
            web_url: "http://wwww.google.com"
        };

        // TODO: remove to the data.json file
        organizationPost = {
            name:'Nicasa',
            description:'Mental Heath Services Dupage County',
            web_url: "http://www.mentalheath.org/",
            services: [],
            tags: []
        };

        organizationPost.services.push(servicePost);

        // TODO: remove to the data.json file
        organizationPut = {
            name:'Nicasa Behavior Service Inc',
            description:'Mental Heath Services Dupage & Cook County'
        };

        organizationPatch = {enabled:false};

        done();
    })

    it('POST /organization', function(done){
        agent.post('/api/organizations')
            .send(organizationPost)
            .expect(201)
            .end(function(err, results){
                if (err) return console.error('POST /organization (%s)', err);

                results.body.should.have.property('description').which.is.a.String();
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.should.have.property('services').which.is.a.Array();
                results.body.should.have.property('tags').which.is.a.Array();

                organizationId = results.body._id;

                done();
            })
    })

    it('GET /organizations/:organizationId', function(done) {
        if (!organizationId) return console.error("organizationId is %s", "Empty or Nil");

        agent.get('/api/organizations/' + organizationId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('GET /organizations/:organizationId (%s)', err);

                results.body._id.should.be.equal(organizationId);
                results.body.should.have.property('name').which.is.a.String();
                results.body.name.should.equal(organizationPost.name);
                results.body.should.have.property('description').which.is.a.String();
                results.body.description.should.equal(organizationPost.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.should.have.property('services').which.is.a.Array();
                results.body.should.have.property('tags').which.is.a.Array();

                done();
            })
    })

    it('GET /organizations/?name=', function(done) {
        agent.get('/api/organizations/?name=Nicasa')
            .expect(200)
            .end(function(err, results) {
                if (err) return console.error('GET /organizations/?name=Nicasa (%s)', err);

                results.body[0]._id.should.be.equal(organizationId);
                results.body[0].should.have.property('name').which.is.a.String();
                results.body[0].name.should.equal(organizationPost.name);
                results.body[0].should.have.property('description').which.is.a.String();
                results.body[0].description.should.equal(organizationPost.description);
                results.body[0].should.have.property('_id');
                results.body[0].should.have.property('web_url').which.is.a.String();
                results.body[0].should.have.property('services').which.is.a.Array();
                results.body[0].should.have.property('tags').which.is.a.Array();

                done();
            })
    })

    it('PUT /organizations/:organizationId', function(done) {
        // console.log('PUT: '+ organizationId)
        if (!organizationId) return console.error("organizationId is %s", "Empty or Nil");

        agent.put('/api/organizations/' + organizationId)
            .send(organizationPut)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PUT /organizations/:organizationId (%s)', err);

                results.body._id.should.be.equal(organizationId);
                results.body.name.should.equal(organizationPut.name);
                results.body.description.should.equal(organizationPut.description);

                done();
            })
    })

    it('PATCH /organizations/:organizationId', function(done) {
        agent.patch('/api/organizations/' + organizationId)
            .send(organizationPatch)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PATCH /organizations/:organizationId (%s)', err);

                results.body.enabled.should.equal(organizationPatch.enabled);

                done();
            })
    })

    it('DELETE /organizations/:organizationId', function(done) {
        agent.del('/api/organizations/' + organizationId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('DELETE /organizations/:organizationId (%s)', err);

                results.body.message.should.equal('Successful delete');

                done();
            })
    })

    after(function(done) {
        Organization.remove({}).exec();
        done();
    })

});