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
        // todo: move to data.json file for DRY reasons
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
        // servicePut = {
        //     m_id: 0,
        //     name:'Nicasa',
        //     description:'Mental Heath Services Dupage & Cook County'};
        // servicePatch = {enable:false};

        done();
    })

    it('POST /service', function(done){
        // console.log(servicePost);

        agent.post('/api/service')
            .send(servicePost)
            .expect(201)
            .end(function(err, results){
                if (err) return console.error('POST /service (%s)', err);

                results.body.should.have.property('description').which.is.a.String();
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                // results.body.should.have.property('tags').which.is.a.Array();
                serviceId = results.body._id;

                // console.log(results.body);
                done();
            })
    })

    it('GET /service/:serviceId', function(done) {
        if (!serviceId) return console.error("serviceId is %s", "Empty or Nil");

        agent.get('/api/service/' + serviceId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('GET /service/:serviceId (%s)', err);

                results.body._id.should.be.equal(serviceId);
                results.body.should.have.property('name').which.is.a.String();
                results.body.name.should.equal(servicePost.name);
                results.body.should.have.property('description').which.is.a.String();
                results.body.description.should.equal(servicePost.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                // results.body.should.have.property('tags').which.is.a.Array();
                // console.log(results.body);
                done();
            })
    })

    // it('GET /service/?genre=', function(done) {
    //     agent.get('/api/service/?genre=Fiction')
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

    // it('PUT /service/:serviceId', function(done) {
    //     console.log('PUT: '+ serviceId)

    //     agent.put('/api/service/' + serviceId)
    //         .send(servicePut)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Service Schema
    //             console.log(servicePost.name)
    //             results.body.name.should.equal('Service 1');
    //             // results.body.title.should.equal('New Book');
    //             // results.body.author.should.equal('John Doe');

    //             done();
    //         })
    // })

    // it('PATCH /service/:serviceId', function(done) {
    //     console.log('PATCH: '+ serviceId)

    //     agent.patch('/api/service/' + serviceId)
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

    it('DELETE /service/:serviceId', function(done) {
        console.log('DELETE: '+ serviceId)

        agent.del('/api/service/' + serviceId)
            .expect(200)
            .end(function(err, results){
                results.body.message.should.equal('Successful delete');

                // console.log(results.body);
                done();
            })
    })

    after(function(done) {
        Service.remove({}).exec();
        done();
    })

});