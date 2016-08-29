var express = require('express');

var routes = function(Service){
    var serviceRouter = express.Router();
    var serviceController = require('../controllers/serviceController')(Service);

    serviceRouter.route('/')
        .post(serviceController.post)
        .get(serviceController.get);

    serviceRouter.use('/:serviceId', function(req, res, next){
        Service.findById(req.params.serviceId, function(err, service){
            if (err) {
                res.status(500).send(err);
            }
            else if (service) {
                req.service = service;
                next();
            }
            else {
                res.status(404).send('no service found.');
            }
        });
    });

    serviceRouter.route('/:serviceId')
        .get(function(req,res){
            var returnService = req.service.toJSON();
            var newLink = {};

            newLink = 'http://' + req.headers.host + '/api/services/?tags=' + encodeURIComponent(returnService.tags);

            returnService.links = {};
            returnService.links.FilterByThisTag = newLink;

            res.json(returnService);
        })
        .put(serviceController.put)
        .patch(serviceController.patch)
        .delete(serviceController.del);

    return serviceRouter;
};

module.exports = routes;