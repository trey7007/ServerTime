import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({

    orgId: { type: String, required: true},

    date: {type: Date, required: true},

    //[worker, start, end]
    shifts: [
        {
            workerId: { type: String, required: true},

            start: {type: String, required: true},

            end: {type: String, required: true},
        }
    ], 

});

const Schedule = mongoose.models.Schedule|| mongoose.model('Schedule', ScheduleSchema);

export default Schedule;