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
    username: {
        type: String
    }
});

const Job = mongoose.model('Job', jobSchema)

module.exports = { Job }