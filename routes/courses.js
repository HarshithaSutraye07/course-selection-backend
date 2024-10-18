const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacherId');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  const { name, type, teacherId } = req.body;
  try {
    const newCourse = new Course({ name, type, teacherId });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
