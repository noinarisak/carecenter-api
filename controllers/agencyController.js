var agencyController = function(Agency, Service) {
    var post = function(req, res){
        var agency = new Agency(req.body);
        
        if (!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            
            //TODO: Entire approach has to be looked at. Does not make sense if we tring POST both Agency and Services objects. 
            // wondering best practices for REST call with joins/relations between two items.
            agency.save(function(err){
                if (err) return console.error(err);
            });
            
            // var service1 = new Service(
            //     {
            //         name:'Drug Program',
            //         description:'Drug prevention for addicts',
            //         _agency: agency.m_id
            //     });
                
            // console.log('--');
            // console.log(JSON.stringify(service1, null, "\t"));
            
            // service1.save(function (err) {
            //     if (err) return console.error(err);
            //     // TODO: the order of the find is not correct. It might be the other way around.
            //     service1.find({})
            //         .populate('_agency')
            //         .exec(function(error, service) {
            //             console.log('service1.exec()');
            //             console.log(JSON.stringify(service, null, "\t"));
            //         });
                    
            //     console.log('service1.save() success!');
            // });
            
            // agency.services.push(service1);
            // agency.save(function(err) {
            //     if (err) return console.error(err);
            // });
            
            res.status(201);
            res.send(agency);
        }
    }
    
    var get = function(req, res){
        
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        Agency.find(query, function(err, agencys){
            if (err) {
                res.status(500).send(err);
            }
            else {
                
                var returnAgencys = []; 
                agencys.forEach(function(element, index, array){
                    var newAgency = element.toJSON();
                    newAgency.links = {};
                    newAgency.links.self = 'http://' + req.headers.host + '/api/agencys/' + newAgency._id; 
                    returnAgencys.push(newAgency);
                });
                
                res.json(returnAgencys);
            }
        });
    }
    
    var put = function(req, res){
        req.agency.name = req.body.name;
        req.agency.description = req.body.description;
        // req.agency.services = req.body.services;
        req.agency.enabled = req.body.enabled;
        
        req.agency.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.agency);
            }
        });
    }
    
    var patch = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for(var p in req.body) {
            req.agency[p] = req.body[p];
        }
        
        req.agency.save(function(err){
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.agency);
            }
        });
    }
    
    var del = function(req, res){
        req.agency.remove(function(err){
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

module.exports = agencyController;