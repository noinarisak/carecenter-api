var bookController = function(Book) {
    var post = function(req, res){
        var book = new Book(req.body);
        
        if (!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }
    
    var get = function(req, res){
        
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books){
            if (err) {
                res.status(500).send(err);
            }
            else {
                
                var returnBooks = []; 
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id; 
                    returnBooks.push(newBook);
                });
                
                res.json(returnBooks);
            }
        });
    }
    
    var put = function(req, res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        
        req.book.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    }
    
    var patch = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for(var p in req.body) {
            req.book[p] = req.body[p];
        }
        
        req.book.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.book);
            }
        });
    }
    
    var del = function(req, res){
        req.book.remove(function(err){
            if (err){
                res.status(500).send(err);
            }
            else {
                // res.status(204).send('Removed');
                
                var message = { message: 'Successful delete'};
                res.json(message);
            }
        });
    
    }
    
    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        del: del
    }

}

module.exports = bookController;