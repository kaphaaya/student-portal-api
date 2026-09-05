import express from 'express';
import Student from '../models/student.mjs';

const router = express.Router();

// 1. CREATE
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// 2. GET ONE STUDENT
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid student ID'
    });
  }
});

// 3. UPDATE NAME ONLY
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name: name },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid student ID'
    });
  }
});

// 4. DELETE STUDENT
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json({
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: 'Invalid student ID'
    });
  }
});

export default router;