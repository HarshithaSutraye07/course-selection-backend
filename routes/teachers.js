const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new teacher
router.post('/', async (req, res) => {
  const { name, ratings, research, background } = req.body;
  try {
    const newTeacher = new Teacher({ name, ratings, research, background });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
