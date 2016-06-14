var express = require('express');

var routes = function(Agency, Service){
    var agencyRouter = express.Router();
    var agencyController = require('../controllers/agencyController')(Agency, Service);
    
    agencyRouter.route('/')
        .post(agencyController.post)
        .get(agencyController.get);
        
    agencyRouter.use('/:agencyId', function(req, res, next){
        Agency.findById(req.params.agencyId, function(err, agency){
            if (err) {
                res.status(500).send(err);
            }
            else if (agency) {
                req.agency = agency;
                next();
            }
            else {
                res.status(404).send('no agency found.');
            }
        });
    });
    
    agencyRouter.route('/:agencyId')
        .get(function(req,res){
            var returnAgency = req.agency.toJSON();
            var newLink = {};
            
            newLink = 'http://' + req.headers.host + '/api/agencys/?genre=' + encodeURIComponent(returnAgency.genre); 
    
            returnAgency.links = {};
            returnAgency.links.FilterByThisGenre = newLink;
            
            res.json(returnAgency);
        })
        .put(agencyController.put)
        .patch(agencyController.patch)
        .delete(agencyController.del);
    
    return agencyRouter;
};

module.exports = routes;