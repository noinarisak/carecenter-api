var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    agent = request.agent(app);

describe('Organization Crud Test', function(){
    var organizationPost;
    var organizationPut;
    var organizationPatch;
    var organizationId;
    var servicePost;

    before(function(done){

        // todo: remove to the data.json file
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

        // todo: remove to the data.json file
        organizationPost = {
            m_id: 0,
            name:'Nicasa',
            description:'Mental Heath Services Dupage County',
            web_url: "http://www.mentalheath.org/",
            services: [],
            tags: []
        };

        organizationPost.services.push(servicePost);

        // todo: remove to the data.json file
        organizationPut = {
            m_id: 0,
            name:'Nicasa',
            description:'Mental Heath Services Dupage & Cook County'
        };

        organizationPatch = {enable:false};

        done();
    })

    it('POST /organization', function(done){
        agent.post('/api/organizations')
            .send(organizationPost)
            .expect(201)
            .end(function(err, results){
                if (err) return console.error('POST /organization (%s)', err);
                // console.log(results.body);

                results.body.m_id.should.equal(0);
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
                results.body.m_id.should.equal(0);
                results.body.should.have.property('name').which.is.a.String();
                results.body.name.should.equal(organizationPost.name);
                results.body.should.have.property('description').which.is.a.String();
                results.body.description.should.equal(organizationPost.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.should.have.property('services').which.is.a.Array();
                results.body.should.have.property('tags').which.is.a.Array();
                // console.log(results.body);
                done();
            })
    })

    // it('GET /organizations/?genre=', function(done) {
    //     agent.get('/api/organizations/?genre=Fiction')
    //         .expect(200)
    //         .end(function(err, results) {
    //             // todo: Update the inline json for Organization Schema
    //             results.body[0].genre.should.equal('Fiction');
    //             results.body[0].title.should.equal('New Book');
    //             results.body[0].author.should.equal('Noi');

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    // it('PUT /organizations/:organizationId', function(done) {
    //     console.log('PUT: '+ organizationId)

    //     agent.put('/api/organizations/' + organizationId)
    //         .send(organizationPut)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Organization Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');

    //             done();
    //         })
    // })

    // it('PATCH /organizations/:organizationId', function(done) {
    //     console.log('PATCH: '+ organizationId)

    //     agent.patch('/api/organizations/' + organizationId)
    //         .send(organizationPatch)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Organization Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');
    //             results.body.read.should.equal(true);

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    // it('DELETE /organizations/:organizationId', function(done) {
    //     console.log('DELETE: '+ organizationId)

    //     agent.del('/api/organizations/' + organizationId)
    //         .expect(200)
    //         .end(function(err, results){
    //             results.body.message.should.equal('Successful delete');

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    // afterEach(function(done){
    //   Book.remove().exec();
    //   done();
    // })

    after(function(done) {
        Organization.remove({}).exec();
        done();
    })

});