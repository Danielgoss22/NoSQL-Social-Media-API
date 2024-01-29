const router = require("express").Router();
const {
  getUsers,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require("../../controllers/users");
