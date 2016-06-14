var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    _agency: {
        type: Number, 
        ref: 'Agency' 
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Service', serviceSchema);
