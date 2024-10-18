const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
