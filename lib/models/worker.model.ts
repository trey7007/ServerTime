import mongoose from 'mongoose';
import { Dayjs } from "dayjs";

const workerSchema = new mongoose.Schema({

    id: { type: String, required: true},

    firstname: { type: String, required: true},

    lastname: { type: String, required: true},

    mondaystart: { type: String, default: null },

    mondayend: { type: String, default: null},
});

const Worker = mongoose.models.Worker|| mongoose.model('Worker', workerSchema);

export default Worker;