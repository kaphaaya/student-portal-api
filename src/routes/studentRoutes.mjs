import express from 'express';

import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.mjs';

const router = express.Router();

// CREATE
router.post('/', createStudent);

// GET
router.get('/:id', getStudent);

// UPDATE
router.put('/:id', updateStudent);

// DELETE
router.delete('/:id', deleteStudent);

export default router;
