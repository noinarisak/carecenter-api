
exports.findAll = function(req, res) {
   console.log("services.findAll()")
   res.send(404, { "error" : "Not Implemented" });
};

exports.findById = function(req, res) {
   console.log("services.findById(" + req.params.id + ")")
   res.send(404, { "error" : "Not Implemented" });
};

exports.findByOrganizationId = function(req, res) {
   console.log("services.findByOrganizationId(" + req.params.id + ")")
   res.send(404, { "error" : "Not Implemented" });
};

exports.add = function(req, res) {
   console.log("services.add()")
   res.send(404, { "error" : "Not Implemented" });
};

exports.update = function(req, res) {
   console.log("services.update()")
   res.send(404, { "error" : "Not Implemented" });
};

exports.delete = function(req, res) {
   console.log("services.delete()")
   res.send(404, { "error" : "Not Implemented" });
};