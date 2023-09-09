import mongoose from 'mongoose';

const ShiftSchema = new mongoose.Schema({

    workerId: { type: String, required: true},

    shiftime: {type: String, required: true}, 

});

const Shift = mongoose.models.Shift|| mongoose.model('Shift', ShiftSchema);

export default Shift;