// // models/projectModel.js
// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     status: { type: String, required: true, enum: ['Not Started', 'In Progress', 'Completed'] },
//     priority: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
//     teamMembers: [{ type: String }]
// }, { timestamps: true });

// const Project = mongoose.model('Project', projectSchema);

// module.exports = Project;
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    members: { type: [String], default: [] }, // Added members field to store email addresses
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Project', projectSchema);
