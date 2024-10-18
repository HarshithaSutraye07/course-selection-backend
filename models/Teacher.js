const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  research: { type: String },
  background: { type: String },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
