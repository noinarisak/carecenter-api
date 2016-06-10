var should = require('should'),
    sinon = require('sinon');
    
describe('Book Controller Tests:', function(){
   describe('Post', function() {
       it('should not allow any empty title on post', function(){
            // Setup
            var Book = function(book){
                this.save = function(){}
            };
           
            var req = {
                body: {
                    author: 'Noi'
                }
            }
           
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
           
            // Action
            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req, res);
           
            // Assert
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
            
       })
   })
   
});