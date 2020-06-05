const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company: {
        required: true
    },
    titleOfPosition: {
        required: true
    },
    coverLetter: {
        required: true
    },
    referral: {
        required: true
    },
    notes: {
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema)

module.exports = { Job }