const mongoose = require('mongoose');
const launchSchema = new mongoose.Schema({
    flightNumber: { type: Number, required: true, unique: true,  },
    mission: {    type: String, required: true },
    rocket: {    type: String, required: true },                      
    // target: {  type : mongoose.Schema.Types.ObjectId, ref: 'Planet' },
    target: {    type: String, required: true }, // Assuming target is a string for simplicity
    launchDate: {    type: Date, required: true },
    customers: [String],
    upcoming: {    type: Boolean, default: true },
    success: {    type: Boolean, default: true }
}, {
  timestamps: true      
});

launchSchema.index({ mission: 1, rocket: 1 });    


module.exports = mongoose.model('Launch', launchSchema);



