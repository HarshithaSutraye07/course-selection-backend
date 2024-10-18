const express = require('express');
const pool = require('./config/db');

const app = express();
app.use(express.json());

// Sample route to get courses
app.get('/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sample route to add a course
app.post('/courses', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/students', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM students');
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/students', async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //single student details 
  app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });  

  app.get('/teachers', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM teachers');
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.post('/teachers', async (req, res) => {
    const { name, profile } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO teachers (name, profile) VALUES ($1, $2) RETURNING *',
        [name, profile]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  app.post('/feedback', async (req, res) => {
    const { student_id, teacher_id, course_id, rating, comments } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO feedback (student_id, teacher_id, course_id, rating, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [student_id, teacher_id, course_id, rating, comments]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/feedback/teacher/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM feedback WHERE teacher_id = $1',
        [id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

//student enrolments  
  app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/enrollments/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `SELECT courses.*, teachers.name as teacher_name
         FROM enrollments
         JOIN courses ON enrollments.course_id = courses.id
         JOIN teachers ON enrollments.teacher_id = teachers.id
         WHERE enrollments.student_id = $1`,
        [id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //teachers enrollments
  app.get('/teachers/:id/courses', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `SELECT courses.*
         FROM courses
         JOIN enrollments ON courses.id = enrollments.course_id
         WHERE enrollments.teacher_id = $1`,
        [id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/enrollments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM enrollments WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
      res.json({ message: 'Enrollment removed', enrollment: result.rows[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
