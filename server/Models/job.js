const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company: {
        required: true,
        type: String
    },
    position: {
        required: true,
        type: String
    },
    coverLetter: {
        required: true,
        type: Boolean
    },
    referral: {
        required: true,
        type: Boolean
    },
    notes: {
        required: true,
        type: String
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Job = mongoose.model('Job', jobSchema)

module.exports = { Job }