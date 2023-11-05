const express = require("express");
const routes = express();
const {upload} = require("../config/file");
const FileController = require("../controller/FileController");

routes.post("/upload-image",upload.single("file_to_upload"),FileController.uploadImage);
routes.get("/get/:key",FileController.getImage);
// routes.post("/upload-course-thumbnail",upload.single("file_to_upload"),FileController.uploadCourseThumbnail);


module.exports = routes;