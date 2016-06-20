var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var agencySchema = new Schema({
    m_id: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    services: [
            { type: Schema.Types.ObjectId, ref: 'Service' }
    ],
    enabled: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Agency', agencySchema);
