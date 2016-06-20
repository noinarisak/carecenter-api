var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);
    
describe('Book Crud Test', function(){
    var bookPost;
    var bookPut;
    var bookPatch;
    var bookId; 
    
    before(function(done){
        bookPost = {title:'New Book', author:'Noi', genre:'Fiction'};
        bookPut = {title:'New Book', author:'John Doe', genre:'Science Fiction'};
        bookPatch = {read:true};
        
        done();
    })
    
    it('POST /books', function(done){
        // var bookPost = {title:'New Book', author:'Noi', genre:'Fiction'};
        
        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
            .end(function(err, results){
                if (err) return console.error('POST /books' + err);
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                bookId = results.body._id;
                
                // console.log(results.body);
                done();
            })
    })
      
    it('GET /books/:bookId', function(done) {
        console.log('GET: ' + bookId);
        
        agent.get('/api/books/' + bookId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('GET /books/:bookId\t' + err);
                results.body._id.should.be.equal(bookId);
                results.body.genre.should.equal('Fiction');
                results.body.title.should.equal('New Book');
                results.body.author.should.equal('Noi');
                
                // results.body.should.be.instanceof(Array);
                
                // console.log(results.body);
                done();
            })
    })
    
    it('GET /books/?genre=', function(done) {
        agent.get('/api/books/?genre=Fiction')
            .expect(200)
            .end(function(err, results) {
                if (err) return console.error('GET \t' + err);
                results.body[0].genre.should.equal('Fiction');
                results.body[0].title.should.equal('New Book');
                results.body[0].author.should.equal('Noi');
                
                // console.log(results.body);
                done();
            })
    })
    
    it('PUT /books/:bookId', function(done) {
        // console.log('PUT: '+ bookId)
        
        agent.put('/api/books/' + bookId)
            .send(bookPut)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PUT \t' + err);
                results.body.genre.should.equal('Science Fiction');
                results.body.title.should.equal('New Book');
                results.body.author.should.equal('John Doe');
                
                done();
            })
    })
    
    it('PATCH /books/:bookId', function(done) {
        // console.log('PATCH: '+ bookId)
        
        agent.patch('/api/books/' + bookId)
            .send(bookPatch)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error('PATCH\t' + err);
                results.body.genre.should.equal('Science Fiction');
                results.body.title.should.equal('New Book');
                results.body.author.should.equal('John Doe');
                results.body.read.should.equal(true);
                
                // console.log(results.body);
                done();
            })
    })
    
    it('DELETE /books/:bookId', function(done) {
        // console.log('DELETE: '+ bookId)
        
        agent.del('/api/books/' + bookId)
            .expect(200)
            .end(function(err, results){
                if (err) return console.error(err);
                results.body.message.should.equal('Successful delete');
                
                // console.log(results.body);
                done();
            })
    })
    
    // afterEach(function(done){
    //   Book.remove().exec();
    //   done();
    // })
    
    after(function(done) {
        Book.remove({}).exec();
        done();
    })
    
});