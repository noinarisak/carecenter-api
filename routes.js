module.exports = function(app){
    var organizations = require('./controllers/organizations');
    app.get('/organizations', organizations.findAll);
    app.get('/organizations/:id', organizations.findById);
    app.post('/organizations', organizations.add);
    app.put('/organizations/:id', organizations.update);
    app.delete('/organizations/:id', organizations.delete);
}