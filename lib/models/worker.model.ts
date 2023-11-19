import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({

    orgId: {type: String, require: true},

    firstname: { type: String, required: true},

    lastname: { type: String, required: true},

    monday: [
        {type: String}
    ],
    
    tuesday: [
        {type: String}
    ],

    wednesday: [
        {type: String}
    ],

    thursday: [
        {type: String}
    ],

    friday: [
        {type: String}
    ],

    saturday: [
        {type: String}
    ],

    sunday: [
        {type: String}
    ],
});

const Worker = mongoose.models.Worker|| mongoose.model('Worker', workerSchema);

export default Worker;