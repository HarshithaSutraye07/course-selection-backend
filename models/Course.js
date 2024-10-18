const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['theory', 'lab'], required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

module.exports = mongoose.model('Course', CourseSchema);
