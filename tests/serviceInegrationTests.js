var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Service = mongoose.model('Service'),
    agent = request.agent(app);

describe('Service Crud Test', function(){
    var servicePost;
    var servicePut;
    var servicePatch;
    var serviceId;

    before(function(done){
        /* todo: make this Service object */
        servicePost = {
            m_id: 0,
            name:'Nicasa',
            description:'Mental Heath Services Dupage County',
            web_url: "http://www.mentalheath.org/"
        };
        servicePut = {
            m_id: 0,
            name:'Nicasa',
            description:'Mental Heath Services Dupage & Cook County'};
        servicePatch = {enable:false};

        done();
    })

    it('POST /service', function(done){
        agent.post('/api/services')
            .send(servicePost)
            .expect(201)
            .end(function(err, results){
                if (err) return console.error('POST /service (%s)', err);
                results.body.m_id.should.equal(0);
                results.body.should.have.property('description').which.is.a.String();
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.should.have.property('services').which.is.a.Array();
                results.body.should.have.property('tags').which.is.a.Array();
                serviceId = results.body._id;

                // console.log(results.body);
                done();
            })
    })

    it('GET /services/:serviceId', function(done) {
        if (!serviceId) return console.error("serviceId is %s", "Empty or Nil");

        agent.get('/api/services/' + serviceId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('GET /services/:serviceId (%s)', err);
                results.body._id.should.be.equal(serviceId);
                results.body.m_id.should.equal(0);
                results.body.should.have.property('name').which.is.a.String();
                results.body.name.should.equal(servicePost.name);
                results.body.should.have.property('description').which.is.a.String();
                results.body.description.should.equal(servicePost.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.should.have.property('services').which.is.a.Array();
                results.body.should.have.property('tags').which.is.a.Array();
                // console.log(results.body);
                done();
            })
    })

    // it('GET /services/?genre=', function(done) {
    //     agent.get('/api/services/?genre=Fiction')
    //         .expect(200)
    //         .end(function(err, results) {
    //             // todo: Update the inline json for Service Schema
    //             results.body[0].genre.should.equal('Fiction');
    //             results.body[0].title.should.equal('New Book');
    //             results.body[0].author.should.equal('Noi');

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    // it('PUT /services/:serviceId', function(done) {
    //     console.log('PUT: '+ serviceId)

    //     agent.put('/api/services/' + serviceId)
    //         .send(servicePut)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Service Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');

    //             done();
    //         })
    // })

    // it('PATCH /services/:serviceId', function(done) {
    //     console.log('PATCH: '+ serviceId)

    //     agent.patch('/api/services/' + serviceId)
    //         .send(servicePatch)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Service Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');
    //             results.body.read.should.equal(true);

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    // it('DELETE /services/:serviceId', function(done) {
    //     console.log('DELETE: '+ serviceId)

    //     agent.del('/api/services/' + serviceId)
    //         .expect(200)
    //         .end(function(err, results){
    //             results.body.message.should.equal('Successful delete');

    //             // console.log(results.body);
    //             done();
    //         })
    // })

    after(function(done) {
        Service.remove({}).exec();
        done();
    })

});