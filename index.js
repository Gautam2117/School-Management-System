const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'school_mgt_system',
  password: 'gautam123',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Signup for academic admin
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const username = `${firstName} ${lastName}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO academicadmin (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login for academic admin
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM academicadmin WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const admin = result.rows[0];
      const validPassword = await bcrypt.compare(password, admin.password);
      if (validPassword) {
        res.status(200).json({ message: 'Login successful', admin });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in. Please try again.' });
  }
});

// Signup for finance admin
app.post('/signup/finance', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const username = `${firstName} ${lastName}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO financeadmin (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login for finance admin
app.post('/login/finance', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM financeadmin WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const admin = result.rows[0];
      const validPassword = await bcrypt.compare(password, admin.password);
      if (validPassword) {
        res.status(200).json({ message: 'Login successful', admin });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in. Please try again.' });
  }
});

// Signup for student
app.post('/signup/student', async (req, res) => {
  const {
    firstName, lastName, class: studentClass, section, age,
    gender, phoneNumber, fathersName, admissionNumber, email, password
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO student (first_name, last_name, class, section, age, gender, phone_number, fathers_name, admission_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [firstName, lastName, studentClass, section, age, gender, phoneNumber, fathersName, admissionNumber, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login for student
app.post('/login/student', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM student WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const student = result.rows[0];
      const validPassword = await bcrypt.compare(password, student.password);
      if (validPassword) {
        res.status(200).json({ message: 'Login successful', student });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in. Please try again.' });
  }
});

// Signup for teacher with profile picture upload
app.post('/signup/teacher', upload.single('profilePicture'), async (req, res) => {
  const { firstName, lastName, age, gender, phoneNumber, email, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null; // Use relative URL

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO teacher (first_name, last_name, age, gender, phone_number, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [firstName, lastName, age, gender, phoneNumber, email, hashedPassword, profilePicture]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login for teacher
app.post('/login/teacher', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const teacher = result.rows[0];
      const validPassword = await bcrypt.compare(password, teacher.password);
      if (validPassword) {
        res.status(200).json({ message: 'Login successful', teacher });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to log in. Please try again.' });
  }
});

// Get teacher details by email
app.get('/teacher/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    console.error('Error fetching teacher details:', err);
    res.status(500).json({ message: 'Failed to fetch teacher details. Please try again.' });
  }
});

// Homework routes
app.get('/homework', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM homework ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching homework:', err);
    res.status(500).json({ message: 'Failed to fetch homework. Please try again.' });
  }
});

app.post('/homework', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO homework (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error assigning homework:', err);
    res.status(500).json({ message: 'Failed to assign homework. Please try again.' });
  }
});

app.put('/homework/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE homework SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating homework:', err);
    res.status(500).json({ message: 'Failed to update homework. Please try again.' });
  }
});

app.post('/homework/approve/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE homework SET status = $1 WHERE id = $2 RETURNING *',
      ['approved', id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error approving homework:', err);
    res.status(500).json({ message: 'Failed to approve homework. Please try again.' });
  }
});

app.get('/timetable', async (req, res) => {
  try {
    const teacherId = 4;  // This should ideally come from session or authenticated user data
    const result = await pool.query(`
      SELECT tt.day_of_week, tt.start_time, tt.end_time, s.subject_name, cl.class_name
      FROM timetable tt
      JOIN subject s ON tt.subject_id = s.subject_id
      JOIN class cl ON tt.class_id = cl.class_id
      WHERE tt.teacher_id = $1
      ORDER BY tt.day_of_week, tt.start_time
    `, [teacherId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: 'No timetable data found for the specified teacher.' });
    }
  } catch (err) {
    console.error('Error fetching timetable:', err);
    res.status(500).json({ message: 'Failed to fetch timetable. Please try again.' });
  }
});

app.post('/timetable', async (req, res) => {
  const { dayOfWeek, startTime, endTime, className } = req.body;
  try {
    const classResult = await pool.query('SELECT class_id FROM class WHERE class_name = $1', [className]);
    const classId = classResult.rows[0].class_id;

    const result = await pool.query(
      'INSERT INTO timetable (day_of_week, start_time, end_time, class_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [dayOfWeek, startTime, endTime, classId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating timetable:', err);
    res.status(500).json({ message: 'Failed to update timetable. Please try again.' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM student');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Failed to fetch students. Please try again.' });
  }
});

app.get('/attendance/:class_id', async (req, res) => {
  const { class_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT s.student_id, s.first_name, s.last_name, a.date,
             COALESCE(a.status, FALSE) as status
      FROM student s
      LEFT JOIN attendance a ON s.student_id = a.student_id AND a.date = CURRENT_DATE
      WHERE s.class = $1
    `, [class_id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ message: 'Failed to fetch attendance. Please try again.' });
  }
});

app.post('/attendance', async (req, res) => {
  const { student_id, date, status } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO attendance (student_id, date, status)
      VALUES ($1, $2, $3)
      ON CONFLICT (student_id, date)
      DO UPDATE SET status = EXCLUDED.status
      RETURNING *;
    `, [student_id, date, status]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ message: 'Failed to mark attendance. Please try again.' });
  }
});

// Endpoint to change password
app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const result = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const teacher = result.rows[0];
      const validPassword = await bcrypt.compare(oldPassword, teacher.password);

      if (validPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE teacher SET password = $1 WHERE email = $2', [hashedPassword, email]);

        res.status(200).json({ message: 'Password changed successfully' });
      } else {
        res.status(401).json({ message: 'Incorrect old password' });
      }
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Failed to change password. Please try again.' });
  }
});

// Endpoint to fetch all notices
app.get('/notices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM circulars ORDER BY date_posted DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ message: 'Failed to fetch notices. Please try again.' });
  }
});

// Endpoint to post a new notice
app.post('/notices', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO circulars (title, content, date_posted) VALUES ($1, $2, $3) RETURNING *',
      [title, content, new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error posting notice:', err);
    res.status(500).json({ message: 'Failed to post notice. Please try again.' });
  }
});

// Endpoint to fetch all examinations
app.get('/examinations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM examination ORDER BY exam_date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching examinations:', err);
    res.status(500).json({ message: 'Failed to fetch examinations. Please try again.' });
  }
});

// Endpoint to post a new examination
app.post('/examinations', async (req, res) => {
  const { class_id, subject_id, exam_date, duration, total_marks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO examination (class_id, subject_id, exam_date, duration, total_marks) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [class_id, subject_id, exam_date, duration, total_marks]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating examination:', err);
    res.status(500).json({ message: 'Failed to create examination. Please try again.' });
  }
});

// Endpoint to update an examination
app.put('/examinations/:id', async (req, res) => {
  const { id } = req.params;
  const { class_id, subject_id, exam_date, duration, total_marks } = req.body;
  try {
    const result = await pool.query(
      'UPDATE examination SET class_id = $1, subject_id = $2, exam_date = $3, duration = $4, total_marks = $5 WHERE exam_id = $6 RETURNING *',
      [class_id, subject_id, exam_date, duration, total_marks, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating examination:', err);
    res.status(500).json({ message: 'Failed to update examination. Please try again.' });
  }
});

app.get('/certificates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM certificates');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching certificates:', err);
    res.status(500).json({ message: 'Failed to fetch certificates. Please try again.' });
  }
});

app.post('/certificates', async (req, res) => {
  const { student_id, certificate_type, issue_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO certificates (student_id, certificate_type, issue_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_id, certificate_type, issue_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating certificate:', err);
    res.status(500).json({ message: 'Failed to create certificate. Please try again.' });
  }
});

app.put('/certificates/:id', async (req, res) => {
  const { id } = req.params;
  const { certificate_type, issue_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE certificates SET certificate_type = $1, issue_date = $2, status = $3 WHERE certificate_id = $4 RETURNING *',
      [certificate_type, issue_date, status, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating certificate:', err);
    res.status(500).json({ message: 'Failed to update certificate. Please try again.' });
  }
});

// Fetch fees for a specific class and financial year
app.get('/fees/:classId/:financialYear', async (req, res) => {
  const { classId, financialYear } = req.params;
  try {
    const result = await pool.query('SELECT * FROM fees WHERE class = $1 AND financial_year = $2', [classId, financialYear]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching fees:', err);
    res.status(500).json({ message: 'Failed to fetch fees. Please try again.' });
  }
});

// Fetch fee status for a specific student and financial year
app.get('/feestatus/:student_id', async (req, res) => {
  const { student_id } = req.params;
  const { financialYear } = req.query;

  try {
    const result = await pool.query(`
      SELECT f.quarter, f.class, f.tuition_fee, f.exam_fee, f.sports_fee,
             f.electricity_fee, f.transport_with_bus_fee, f.transport_without_bus_fee,
             f.total_fee, fs.status
      FROM feestatus fs
      JOIN fees f ON fs.fee_id = f.fee_id
      WHERE fs.student_id = $1 AND f.financial_year = $2
    `, [student_id, financialYear]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching fee status:', err);
    res.status(500).json({ message: 'Failed to fetch fee status. Please try again.' });
  }
});

// Fetch student data by ID
app.get('/student/:student_id', async (req, res) => {
  const { student_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM student WHERE student_id = $1', [student_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error fetching student data:', err);
    res.status(500).json({ message: 'Failed to fetch student data. Please try again.' });
  }
});

// Fetch homework for a specific class
app.get('/homework/:className', async (req, res) => {
  const { className } = req.params;
  try {
    const result = await pool.query('SELECT * FROM homework WHERE class = $1 ORDER BY due_date ASC', [className]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching homework:', err);
    res.status(500).json({ message: 'Failed to fetch homework. Please try again.' });
  }
});

// Mark homework as completed
app.put('/homework/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE homework SET status = $1 WHERE id = $2 RETURNING *', ['completed', id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating homework status:', err);
    res.status(500).json({ message: 'Failed to update homework status. Please try again.' });
  }
});

app.get('/fees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fees');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching fees:', err);
    res.status(500).json({ message: 'Failed to fetch fees. Please try again.' });
  }
});

app.post('/fees', async (req, res) => {
  const {
    class: studentClass,
    quarter,
    financialYear,
    tuitionFee,
    examFee,
    sportsFee,
    electricityFee,
    transportWithBusFee,
    transportWithoutBusFee,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO fees (class, quarter, financial_year, tuition_fee, exam_fee, sports_fee, electricity_fee, transport_with_bus_fee, transport_without_bus_fee)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [studentClass, quarter, financialYear, tuitionFee, examFee, sportsFee, electricityFee, transportWithBusFee, transportWithoutBusFee]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding fee:', err);
    res.status(500).json({ message: 'Failed to add fee. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
