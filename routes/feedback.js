const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Post feedback
router.post('/', async (req, res) => {
  const { studentId, teacherId, feedback, rating } = req.body;
  try {
    const newFeedback = new Feedback({ studentId, teacherId, feedback, rating });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get feedback for a specific teacher
router.get('/:teacherId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ teacherId: req.params.teacherId });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
