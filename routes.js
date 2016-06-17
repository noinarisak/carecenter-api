module.exports = function(app){
    var organizations = require('./controllers/organizations');
    app.get('/organizations', organizations.findAll);
    app.get('/organizations/:id', organizations.findById);
    app.post('/organizations', organizations.add);
    app.put('/organizations/:id', organizations.update);
    app.delete('/organizations/:id', organizations.delete);
    
    var services = require('./controllers/services');
    app.get('/services', services.findAll);
    app.get('/services/by-organization/:id', services.findByOrganizationId);
    app.get('/services/:id', services.findById);
    app.post('/services', services.add);
    app.put('/services/:id', services.update);
    app.delete('/services/:id', services.delete);
}