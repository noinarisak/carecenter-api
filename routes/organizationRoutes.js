var express = require('express');

var routes = function(Organization, Service){
    var organizationRouter = express.Router();
    var organizationController = require('../controllers/organizationController')(Organization, Service);

    organizationRouter.route('/')
        .post(organizationController.post)
        .get(organizationController.get);

    organizationRouter.use('/:organizationId', function(req, res, next){
        Organization.findById(req.params.organizationId, function(err, organization){
            if (err) {
                res.status(500).send(err);
            }
            else if (organization) {
                req.organization = organization;
                next();
            }
            else {
                res.status(404).send('no organization found.');
            }
        });
    });

    organizationRouter.route('/:organizationId')
        .get(function(req,res){
            var returnOrganization = req.organization.toJSON();
            var newLink = {};

            newLink = 'http://' + req.headers.host + '/api/organizations/?name=' + encodeURIComponent(returnOrganization.name);

            returnOrganization.links = {};
            returnOrganization.links.FilterByThisName = newLink;

            res.json(returnOrganization);
        })
        .put(organizationController.put)
        .patch(organizationController.patch)
        .delete(organizationController.del);

    return organizationRouter;
};

module.exports = routes;