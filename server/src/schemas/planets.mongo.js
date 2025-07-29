const mongoose = require('mongoose');
const planetsSchema = new mongoose.Schema({
    keplerName: { type: String, required: true, unique: true },  
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields   
});
planetsSchema.index({ keplerName: 1 }, { unique: true }); // Ensure unique index on keplerName

// module.exports = mongoose.model('Planet', planetsSchema); // Export the model
// module.exports = launchSchema; // Export the launch schema

module.exports = mongoose.model('Planet', planetsSchema);