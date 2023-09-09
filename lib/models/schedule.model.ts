import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({

    orgId: { type: String, required: true},

    date: {type: Date, required: true},

    //[worker, time]
    shifts: [
        { type: String, required: true},

        {type: String, required: true}, 
    ], 

});

const Schedule = mongoose.models.Schedule|| mongoose.model('Schedule', ScheduleSchema);

export default Schedule;