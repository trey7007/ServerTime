import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({

    db: { type: String, required: true},

    seq_value: { type: Number, required: true},
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

export default Counter;

