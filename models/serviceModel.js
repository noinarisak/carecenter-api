var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var serviceSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    contact_email: {
        type: String
    },
    contact_phone: {
        type: String
    },
    street_address1: {
        type: String
    },
    street_address2: {
        type: String
    },
    street_cityprovince: {
        type: String
    },
    street_state: {
        type: String
    },
    street_postalcode: {
        type: String
    },
    eligibility_desc: {
        type: String
    },
    cost_desc: {
        type: String
    },
    web_url: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Service', serviceSchema);
