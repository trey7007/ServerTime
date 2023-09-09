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
    ]
});

const Worker = mongoose.models.Worker|| mongoose.model('Worker', workerSchema);

export default Worker;