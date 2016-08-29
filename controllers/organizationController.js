var organizationController = function(Organization, Service) {
    var post = function(req, res){
        var organization = new Organization(req.body);

        if (!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            organization.save(function(err){
                if (err) return console.error(err);
            });

            // Check if the array of Services object was pass
            if (req.body.services.length > 0){
                for (var i=0; i < req.body.services.length; i++){
                    var service = req.body.services[i];
                    var serviceObj = new Service(service);
                    serviceObj._organization = organization._id;

                    serviceObj.save(function (err){
                        if (err) return console.error(err);
                    });
                    // console.log(serviceObj);
                }
            }
            // console.log("post_organization" + organization);

            // Service
            // .findOne({ name: 'Service 1' })
            // .populate('_organization')
            // .exec(function (err, service) {
            //     if (err) return console.log(err);
            // });

            res.status(201);
            res.send(organization);
        }
    }

    var get = function(req, res){

        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }

        Organization.find(query, function(err, organizations){
            if (err) {
                res.status(500).send(err);
            }
            else {
                // console.log("org =" + organizations);

                var returnOrganizations = [];
                organizations.forEach(function(element, index, array){
                    var newOrganization = element.toJSON();
                    newOrganization.links = {};
                    newOrganization.links.self = 'http://' + req.headers.host + '/api/organizations/' + newOrganization._id;
                    returnOrganizations.push(newOrganization);
                });

                res.json(returnOrganizations);
            }
        });
    }

    var put = function(req, res){
        req.organization.name = req.body.name;
        req.organization.description = req.body.description;
        // req.organization.services = req.body.services;
        req.organization.enabled = req.body.enabled;

        req.organization.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.organization);
            }
        });
    }

    var patch = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for(var p in req.body) {
            req.organization[p] = req.body[p];
        }

        req.organization.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.organization);
            }
        });
    }

    var del = function(req, res){
        req.organization.remove(function(err){
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

module.exports = organizationController;