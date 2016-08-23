var organizationController = function(Organization, Service) {
    var post = function(req, res){
        var organization = new Organization(req.body);

        if (!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {

            //TODO: Entire approach has to be looked at. Does not make sense if we tring POST both Organization and Services objects.
            // wondering best practices for REST call with joins/relations between two items.
            organization.save(function(err){
                if (err) return console.error(err);

                if (req.body.services.length > 0){
                    var service;
                    for (service in req.body.Services){
                        var serviceObj = new Service(service);
                        serviceObj._organization = req.body.m_id;

                        serviceObj.save(function (err){
                            if (err) return console.error(err);
                        });
                    }
                }

            });

            // var service1 = new Service(
            //     {
            //         name:'Drug Program',
            //         description:'Drug prevention for addicts',
            //         _organization: organization.m_id
            //     });

            // console.log('--');
            // console.log(JSON.stringify(service1, null, "\t"));

            // service1.save(function (err) {
            //     if (err) return console.error(err);
            //     // TODO: the order of the find is not correct. It might be the other way around.
            //     service1.find({})
            //         .populate('_organization')
            //         .exec(function(error, service) {
            //             console.log('service1.exec()');
            //             console.log(JSON.stringify(service, null, "\t"));
            //         });

            //     console.log('service1.save() success!');
            // });

            // organization.services.push(service1);
            // organization.save(function(err) {
            //     if (err) return console.error(err);
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