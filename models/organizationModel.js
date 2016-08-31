var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    web_url: {
        type: String
    },
    services: [
        {
            type: Schema.Types.Mixed,
            ref: 'Service'
        }
    ],
    enabled: {
        type: Boolean,
        default: true
    },
    tags: [
        {
            type: Schema.Types.Mixed,
            ref: 'Tag'
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Organization', organizationSchema);
