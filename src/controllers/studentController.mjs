import Student from '../models/student.mjs';

// CREATE student
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// GET student by ID
export const getStudent = async (req, res) => {
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
};

// UPDATE student name only
export const updateStudent = async (req, res) => {
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
};

// DELETE student
export const deleteStudent = async (req, res) => {
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
};
