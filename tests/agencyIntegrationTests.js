var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Agency = mongoose.model('Agency'),
    agent = request.agent(app);
    
describe('Agency Crud Test', function(){
    var agencyPost;
    var agencyPut;
    var agencyPatch;
    var agencyId;
    
    before(function(done){
        agencyPost = {
            m_id: 0, 
            name:'Nicasa', 
            description:'Mental Heath Services Dupage County'};
        agencyPut = {
            m_id: 0, 
            name:'Nicasa', 
            description:'Mental Heath Services Dupage & Cook County'};
        agencyPatch = {enable:false};
        
        done();
    })
    
    // it('POST /agency', function(done){
    //     agent.post('/api/agencys')
    //         .send(agencyPost)
    //         .expect(201)
    //         .end(function(err, results){
    //             if (err) return console.error('POST /agency ' + err);
    //             results.body.m_id.should.equal(0);
    //             results.body.should.have.property('description').which.is.a.String();
    //             results.body.should.have.property('_id');
               
    //             // console.log(results.body);
    //             done();
    //         })
           
    // })
      
    // it('GET /agencys/:agencyId', function(done) {
    //     console.log('GET: ' + agencyId);
        
    //     agent.get('/api/agencys/' + agencyId)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Agency Schema
    //             results.body._id.should.be.equal(agencyId);
    //             results.body.genre.should.equal('Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('Noi');
                
    //             // results.body.should.be.instanceof(Array);
                
    //             // console.log(results.body);
    //             done();
    //         })
    // })
    
    // it('GET /agencys/?genre=', function(done) {
    //     agent.get('/api/agencys/?genre=Fiction')
    //         .expect(200)
    //         .end(function(err, results) {
    //             // todo: Update the inline json for Agency Schema
    //             results.body[0].genre.should.equal('Fiction');
    //             results.body[0].title.should.equal('New Book');
    //             results.body[0].author.should.equal('Noi');
                
    //             // console.log(results.body);
    //             done();
    //         })
    // })
    
    // it('PUT /agencys/:agencyId', function(done) {
    //     console.log('PUT: '+ agencyId)
        
    //     agent.put('/api/agencys/' + agencyId)
    //         .send(agencyPut)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Agency Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');
                
    //             done();
    //         })
    // })
    
    // it('PATCH /agencys/:agencyId', function(done) {
    //     console.log('PATCH: '+ agencyId)
        
    //     agent.patch('/api/agencys/' + agencyId)
    //         .send(agencyPatch)
    //         .expect(200)
    //         .end(function(err, results){
    //             // todo: Update the inline json for Agency Schema
    //             results.body.genre.should.equal('Science Fiction');
    //             results.body.title.should.equal('New Book');
    //             results.body.author.should.equal('John Doe');
    //             results.body.read.should.equal(true);
                
    //             // console.log(results.body);
    //             done();
    //         })
    // })
    
    // it('DELETE /agencys/:agencyId', function(done) {
    //     console.log('DELETE: '+ agencyId)
        
    //     agent.del('/api/agencys/' + agencyId)
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
        Agency.remove({}).exec();
        done();
    })
    
});