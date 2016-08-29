var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Service', serviceSchema);
