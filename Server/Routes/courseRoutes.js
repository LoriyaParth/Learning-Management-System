const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  addLecture,
  updateLecture,
  deleteLecture,
} = require("../controllers/courseController");

// Course core routes
router.route("/")
  .post(createCourse)
  .get(getCourses);

router.route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

router.route("/:id/enroll")
  .post(enrollInCourse);

// Nested Lecture routes
router.route("/:courseId/lectures")
  .post(addLecture);

router.route("/:courseId/lectures/:lectureId")
  .put(updateLecture)
  .delete(deleteLecture);

module.exports = router;
