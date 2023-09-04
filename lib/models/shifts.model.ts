import mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema({

    orgId: { type: String, required: true},

    date: {type: Date, required: true},

    shifts: [
        {
        type: String
        }
    ],

});

const Shift = mongoose.models.Shift|| mongoose.model('Shift', ShiftSchema);

export default Shift;