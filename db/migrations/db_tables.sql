CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  profile TEXT
);

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  teacher_id INTEGER REFERENCES teachers(id),
  course_id INTEGER REFERENCES courses(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments TEXT
);
