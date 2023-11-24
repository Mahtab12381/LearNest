const Course = require("../model/CourseClass");
const Assignment = require("../model/AssignmentClass");
const User = require("../model/UserClass");
const Progress = require("../model/ProgressClass");
const { validationResult } = require("express-validator");
const HTTP_STATUS = require("../constants/statusCodes");
const response = require("../utility/common");

class AssignmentClass {
  async add(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const { name, description, attachments, mark, course } = req.body;
      const userId = req.user._id;
      const courseObj = await Course.findById(course);
      if (!courseObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Course not found");
      }

      if (courseObj.created_by != userId) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not allowed to create assignment for this course"
        );
      }

      const assignmentObj = await Assignment.create({
        name,
        description,
        attachments,
        mark,
        course,
        created_by: userId,
      });
      return response(
        res,
        HTTP_STATUS.CREATED,
        "Assignment Created Successfully",
        assignmentObj
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal error",
        error
      );
    }
  }

  async getAssignment(req, res) {
    try {
      const assignmentId = req.params.id;
      const assignmentObj = await Assignment.findOne({
        _id: assignmentId,
        isDeleted: false,
      });
      if (!assignmentObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
      }

      if (
        req.role == "instructor" &&
        assignmentObj.created_by != req.user._id
      ) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not allowed to view this assignment"
        );
      }

      if (req.role == "learner") {
        const extCourseProgress = await Progress.findOne({
          user: req.user._id,
        }).select("courseProgress");
        if (extCourseProgress) {
          let matchedCourse = false;
          extCourseProgress.courseProgress.forEach((course) => {
            if (course.course.toString() == assignmentObj.course.toString()) {
              matchedCourse = true;
            }
          });
          if (!matchedCourse) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "You are not enrolled"
            );
          }
        }
      }

      return response(res, HTTP_STATUS.OK, "Assignment found", assignmentObj);
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async getAllAssignment(req, res) {
    try {
      const assignmentObj = await Assignment.find({});
      if (!assignmentObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
      }
      return response(res, HTTP_STATUS.OK, assignmentObj);
    } catch (error) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
    }
  }

  async getAssignmentByCourse(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const course = req.params.id;
      const extCourse = await Course.findById(course);
      if (!extCourse) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Course does not exist");
      }

      if (req.role == "instructor") {
        const extCourseinstructor = await Course.findOne({
          _id: course,
          created_by: req.user._id,
        });
        if (!extCourseinstructor) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "You are not the instructor of this course"
          );
        }
      }

      const extCourseProgress = await Progress.findOne({
        user: req.user._id,
      }).select("courseProgress");
      if (extCourseProgress) {
        let matchedCourse = false;
        extCourseProgress.courseProgress.forEach((course) => {
          if (course.course == req.params.id) {
            matchedCourse = true;
          }
        });
        if (!matchedCourse) {
          return response(res, HTTP_STATUS.BAD_REQUEST, "You are not enrolled");
        }
      }

      const extAssignment = await Assignment.find({
        course: course,
        isDeleted: false,
      });
      if (!extAssignment) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "No assignment found");
      }
      return response(
        res,
        HTTP_STATUS.OK,
        "Assignment Data Received successfully",
        extAssignment
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async getmyCreatedAssignment(req, res) {
    try {
      const userId = req.user._id;
      const extAssignment = await Assignment.find({
        created_by: userId,
        isDeleted: false,
      });
      if (!extAssignment) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "No assignment found");
      }
      return response(
        res,
        HTTP_STATUS.OK,
        "Assignment Data Received successfully",
        extAssignment
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async updateAssignment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }

      const { name, description, attachments, mark, course } = req.body;
      const assignmentId = req.params.id;
      const assignmentObj = await Assignment.findById(assignmentId);
      if (!assignmentObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
      }
      if (assignmentObj.created_by != req.user._id) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not allowed to update this assignment"
        );
      }
      const userId = req.user._id;
      const courseObj = await Course.findById(course);
      if (!courseObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Course not found");
      }
      if (courseObj.created_by != userId) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not allowed to update assignment for this course"
        );
      }

      const updatedAssignmentObj = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          name,
          description,
          attachments,
          mark,
          course,
          created_by: userId,
        },
        { new: true }
      );
      return response(
        res,
        HTTP_STATUS.OK,
        "Assignment Updated Successfully",
        updatedAssignmentObj
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal error",
        error
      );
    }
  }

  async deleteAssignment(req, res) {
    try {
      const assignmentId = req.params.id;
      const assignmentObj = await Assignment.findById(assignmentId);
      if (!assignmentObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
      }
      if (assignmentObj.created_by != req.user._id) {
        return response(
          res,
          HTTP_STATUS.FORBIDDEN,
          "You are not allowed to delete this assignment"
        );
      }
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          isDeleted: true,
        },
        { new: true }
      );
      return response(res, HTTP_STATUS.OK, "Assignment Deleted Successfully");
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async submitAssignment(req, res) {
    try {
      const assignmentId = req.params.id;
      const assignmentObj = await Assignment.findById(assignmentId);
      if (!assignmentObj) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Assignment not found");
      }
      const userId = req.user._id;

      const progressObj = await Progress.findOne({
        user: userId,
      }).select("assignmentProgress");
      let subm = false;
      progressObj.assignmentProgress.forEach((assignment) => {
        if (assignment.assignmentId == assignmentId && assignment.submitted) {
          subm = true;
        }
      });

      if (subm) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Assignment already submitted"
        );
      }

      const { attachments } = req.body;
      const submittedAssignmentObj = {
        assignmentId: assignmentId,
        attachments: attachments,
        submitted: true,
        score: 0,
        submissionDate: Date.now(),
      };
      progressObj.assignmentProgress.push(submittedAssignmentObj);
      await progressObj.save();

      const submitted = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          $push: { submissions: progressObj._id },
        },
        { new: true }
      );

      return response(
        res,
        HTTP_STATUS.OK,
        "Assignment submitted successfully",
        submittedAssignmentObj
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async submitScore(req, res) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, validationErrors.array());
      }

      const { score, feedback } = req.body;
      const progressionId = req.params.id;
      const assignmentID = req.params.assignment;
      const extProgress = await Progress.findOne({
        _id: progressionId,
      }).select("assignmentProgress");

      if (!extProgress) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Progress not found");
      }
      let assignmentProgress = extProgress.assignmentProgress;
      assignmentProgress.forEach((assignment) => {
        if (assignment.assignmentId == assignmentID) {
          assignment.score = score;
          assignment.feedback = feedback;
        }
      });
      await extProgress.save();
      return response(
        res,
        HTTP_STATUS.OK,
        "Score added successfully",
        extProgress
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }

  async getmySubmittedAssignment(req, res) {
    try {
      const userId = req.user._id;
      const extProgress = await Progress.findOne({
        user: userId,
      }).select("assignmentProgress");
      if (!extProgress) {
        return response(res, HTTP_STATUS.NOT_FOUND, "Progress not found");
      }
      return response(
        res,
        HTTP_STATUS.OK,
        "Assignment Data Received successfully",
        extProgress
      );
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Error",
        error
      );
    }
  }
}

module.exports = new AssignmentClass();
