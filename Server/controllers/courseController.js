const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const fs = require("fs");
const path = require("path");

// Helper function to convert base64 payload to local files
const saveBase64ToFile = (base64String, folderName = "uploads") => {
  if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:')) {
    return base64String;
  }

  try {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64String;
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let extension = 'bin';
    if (mimeType.includes('video/mp4')) extension = 'mp4';
    else if (mimeType.includes('video/webm')) extension = 'webm';
    else if (mimeType.includes('video/ogg')) extension = 'ogg';
    else if (mimeType.includes('video/quicktime')) extension = 'mov';
    else if (mimeType.includes('image/png')) extension = 'png';
    else if (mimeType.includes('image/jpeg')) extension = 'jpg';
    else if (mimeType.includes('image/gif')) extension = 'gif';
    else if (mimeType.includes('image/webp')) extension = 'webp';

    const dirPath = path.join(__dirname, '..', folderName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
    const filePath = path.join(dirPath, fileName);

    fs.writeFileSync(filePath, buffer);

    return `http://localhost:5000/${folderName}/${fileName}`;
  } catch (error) {
    console.error("Error saving base64 file:", error);
    return base64String;
  }
};

// --- COURSE CONTROLLERS ---

// @desc    Create a new course
// @route   POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, category, instructorId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Course title is required" });
    }

    const course = await Course.create({
      title,
      category: category || "development",
      instructor: instructorId,
    });

    res.status(201).json({
      message: "Course created successfully!",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all courses (filters by publisher, search query, or instructor)
// @route   GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { status, instructor, search, enrolledStudentId } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }
    if (instructor) {
      filter.instructor = instructor;
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (enrolledStudentId) {
      filter.enrolledStudents = enrolledStudentId;
    }

    const courses = await Course.find(filter)
      .populate("instructor", "name email bio profileImage")
      .populate("lectures");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email bio profileImage")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update course details
// @route   PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { title, subtitle, description, category, level, price, thumbnail, status } = req.body;

    if (title !== undefined) course.title = title;
    if (subtitle !== undefined) course.subtitle = subtitle;
    if (description !== undefined) course.description = description;
    if (category !== undefined) course.category = category;
    if (level !== undefined) course.level = level;
    if (price !== undefined) course.price = Number(price);
    
    // Save image thumbnail to disk if base64
    if (thumbnail !== undefined) {
      course.thumbnail = saveBase64ToFile(thumbnail);
    }
    
    if (status !== undefined) course.status = status;

    const updatedCourse = await course.save();

    res.status(200).json({
      message: "Course updated successfully!",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete course and its associated lectures
// @route   DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete associated lectures
    if (course.lectures && course.lectures.length > 0) {
      await Lecture.deleteMany({ _id: { $in: course.lectures } });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Course and lectures successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
const enrollInCourse = async (req, res) => {
  try {
    const { userId } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    course.enrolledStudents.push(userId);
    await course.save();

    res.status(200).json({
      message: "Successfully enrolled in course!",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// --- LECTURE CONTROLLERS ---

// @desc    Add a lecture to a course
// @route   POST /api/courses/:courseId/lectures
const addLecture = async (req, res) => {
  try {
    const { title, description, videoUrl, isFree } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Save video payload to disk if Base64
    const savedVideoUrl = saveBase64ToFile(videoUrl);

    const lecture = await Lecture.create({
      title,
      description: description || "",
      videoUrl: savedVideoUrl || "https://www.w3schools.com/html/mov_bbb.mp4",
      isFree: isFree || false,
    });

    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({
      message: "Lecture added successfully!",
      lecture,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a lecture
// @route   PUT /api/courses/:courseId/lectures/:lectureId
const updateLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { title, description, videoUrl, isFree } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (title !== undefined) lecture.title = title;
    if (description !== undefined) lecture.description = description;
    
    // Save video payload to disk if Base64
    if (videoUrl !== undefined) {
      lecture.videoUrl = saveBase64ToFile(videoUrl);
    }
    
    if (isFree !== undefined) lecture.isFree = isFree;

    const updatedLecture = await lecture.save();

    res.status(200).json({
      message: "Lecture updated successfully!",
      lecture: updatedLecture,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a lecture from a course
// @route   DELETE /api/courses/:courseId/lectures/:lectureId
const deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove reference from course
    course.lectures = course.lectures.filter((id) => id.toString() !== lectureId);
    await course.save();

    // Delete the lecture document
    await Lecture.findByIdAndDelete(lectureId);

    res.status(200).json({ message: "Lecture deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  addLecture,
  updateLecture,
  deleteLecture,
};
