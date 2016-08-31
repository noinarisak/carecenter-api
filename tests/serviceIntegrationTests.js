var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Service = mongoose.model('Service'),
    agent = request.agent(app);

describe('Service CRUD Test', function(){
    var servicePost;
    var servicePut;
    var servicePatch;
    var serviceId;

    before(function(done){
        // initial mongodb cleanup
        Service.remove({}).exec();

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
            web_url: "http://wwww.google.com",
            tags: [ "clothing", "food-service" ]
        };

        servicePut = {
            name:'Service 1',
            description:'Service description was updated'
        };

        servicePatch = {enabled:false};

        done();
    })

    it('POST /service', function(done){
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
                results.body.should.have.property('tags').which.is.a.Array();

                done();
            })
    })

    it('PUT /service/:serviceId', function(done) {
        agent.put('/api/service/' + serviceId)
            .send(servicePut)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PUT /service/:serviceId (%s)', err);

                results.body.name.should.equal(servicePut.name);
                results.body.description.should.equal(servicePut.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();

                done();
            })
    })

    it('PATCH /service/:serviceId', function(done) {
        agent.patch('/api/service/' + serviceId)
            .send(servicePatch)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PATCH /service/:serviceId (%s)', err);

                results.body.name.should.equal(servicePut.name);
                results.body.description.should.equal(servicePut.description);
                results.body.should.have.property('_id');
                results.body.should.have.property('web_url').which.is.a.String();
                results.body.enabled.should.equal(servicePatch.enabled);

                done();
            })
    })

    it('DELETE /service/:serviceId', function(done) {
        agent.del('/api/service/' + serviceId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('DELETE /service/:serviceId (%s)', err);

                results.body.message.should.equal('Successful delete');

                done();
            })
    })

    after(function(done) {
        Service.remove({}).exec();
        done();
    })

});

describe.skip('Service CRUD Test - Not Implemented', function(){

    it('GET /service/?filter={tags=["clothing", "food"]}', function(done) {
        // Note results.body will be array of Service entities
        // agent.get('/api/service/?tag=Fiction')
        //     .expect(200)
        //     .end(function(err, results) {

        //         // todo: implement assert for filter tags

        //         // console.log(results.body);
        //         done();
        //     })
    })

    it('GET /service/?locate={lat="41.881832",long="-87.623177"}', function(done) {
        // Note results.body will be array of Service entities
        // agent.get('/api/service/?locate={lat="41.881832",long="-87.623177"}')
        //     .expect(200)
        //     .end(function(err, results) {

        //         // todo: implement assert for locate

        //         // console.log(results.body);
        //         done();
        //     })
    })

    it('GET /service/?filter={tags=["clothing", "food"]}&locate={lat="41.881832",long="-87.623177"}', function(done) {
        // Note results.body will be array of Service entities
        // agent.get('/api/service/?filter={tags=["clothing", "food"]}&locate={lat="41.881832",long="-87.623177"}')
        //     .expect(200)
        //     .end(function(err, results) {

        //         // todo: implement assert for filter tags and locate

        //         // console.log(results.body);
        //         done();
        //     })
    })

});