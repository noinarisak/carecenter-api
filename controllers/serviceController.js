var serviceController = function(Service) {
    var post = function(req, res){
        var service = new Service(req.body);

        if (!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            // todo: Design, decision on the POSTing tags too or should that really by another call.

            service.save(function(err){
                if (err) return console.error(err);
            });

            // var service1 = new Service(
            //     {
            //         name:'Drug Program',
            //         description:'Drug prevention for addicts',
            //         _service: service.m_id
            //     });

            // console.log('--');
            // console.log(JSON.stringify(service1, null, "\t"));

            // service1.save(function (err) {
            //     if (err) return console.error(err);
            //     // TODO: the order of the find is not correct. It might be the other way around.
            //     service1.find({})
            //         .populate('_service')
            //         .exec(function(error, service) {
            //             console.log('service1.exec()');
            //             console.log(JSON.stringify(service, null, "\t"));
            //         });

            //     console.log('service1.save() success!');
            // });

            // service.services.push(service1);
            // service.save(function(err) {
            //     if (err) return console.error(err);
            // });

            res.status(201);
            res.send(service);
        }
    }

    var get = function(req, res){

        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        Service.find(query, function(err, services){
            if (err) {
                res.status(500).send(err);
            }
            else {

                var returnServices = [];
                services.forEach(function(element, index, array){
                    var newService = element.toJSON();
                    newService.links = {};
                    newService.links.self = 'http://' + req.headers.host + '/api/services/' + newService._id;
                    returnServices.push(newService);
                });

                res.json(returnServices);
            }
        });
    }

    var put = function(req, res){
        req.service.name = req.body.name;
        req.service.description = req.body.description;
        // req.service.services = req.body.services;
        req.service.enabled = req.body.enabled;

        req.service.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.service);
            }
        });
    }

    var patch = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for(var p in req.body) {
            req.service[p] = req.body[p];
        }

        req.service.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.service);
            }
        });
    }

    var del = function(req, res){
        req.service.remove(function(err){
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

module.exports = serviceController;