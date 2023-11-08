const express = require("express");
const routes = express();
const {uploadVideo , uploadImage ,uploadDocks} = require("../config/file");
const FileController = require("../controller/FileController");
const {isValidLearnerOrInstructor} = require("../middleware/auth");

routes.post("/upload/images",isValidLearnerOrInstructor,uploadImage.single("file_to_upload"),FileController.uploadImage);
routes.post("/upload/videos",isValidLearnerOrInstructor,uploadVideo.single("file_to_upload"),FileController.uploadVideo);
routes.post("/upload/docs",isValidLearnerOrInstructor,uploadDocks.single("file_to_upload"),FileController.uploadDoc);
routes.delete("/delete/docs/:key",FileController.deleteObject);
routes.delete("/delete/images/:key",FileController.deleteObject);
routes.delete("/delete/videos/:key",FileController.deleteObject);


// routes.get("/get/:key",FileController.getImage);
// routes.post("/upload-course-thumbnail",upload.single("file_to_upload"),FileController.uploadCourseThumbnail);


module.exports = routes;