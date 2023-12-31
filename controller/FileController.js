const path = require("path");
const { PutObjectCommand,GetObjectCommand,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { image,video,document } = require("../constants/fileType");
const HTTP_STATUS = require("../constants/statusCodes");
const response = require("../utility/common");
const fs = require("fs");
const { s3 } = require("../config/file");

class FileController {

  async uploadImage(req, res, next) {
    try {
      const file = req.file;
      const folderName = req.url.split("/")[2] + "/";
      if (!file) {
        return response(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      const fileExtension = file.originalname.split(".").pop();

      if (!image.includes(fileExtension)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Only .jpg, .png, .jpeg supported"
        );
      }
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: folderName + Date.now() + "_" + file.originalname.replace(/ /g, '_'),
        Body: file.buffer,
      };
      await s3
        .send(new PutObjectCommand(params))
        .then((data) => {
          return response(
            res,
            HTTP_STATUS.OK,
            "Successfully uploaded file",
            {...data, url: params.Key}
          );
        })
        .catch(() => {
          return response(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "failed to upload file"
          );
        });
    } catch (error) {
      console.log(error);
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async deleteObject(req, res, next) {
    try {
      const key = req.params.key;
      const folderName = req.url.split("/")[2] + "/";
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key:folderName+key,
      };
      await s3.send(new DeleteObjectCommand(params));
      return response(res, HTTP_STATUS.OK, "Successfully deleted file");
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async uploadVideo(req, res, next) {
    try {
      const file = req.file;
      const folderName = req.url.split("/")[2] + "/";
      if (!file) {
        return response(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      const fileExtension = file.originalname.split(".").pop();

      if (!video.includes(fileExtension)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Only .mp4, .mkv, .avi, .flv, .wmv, .mov supported"
        );
      }
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: folderName + Date.now() + "_" + file.originalname.replace(/ /g, '_'),
        Body: file.buffer,
      };
      await s3
        .send(new PutObjectCommand(params))
        .then((data) => {
          return response(
            res,
            HTTP_STATUS.OK,
            "Successfully uploaded file",
            {...data, url: params.Key}
          );
        })
        .catch(() => {
          return response(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "failed to upload file"
          );
        });
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async uploadDoc(req, res, next) {
    try {
      const file = req.file;
      const folderName = req.url.split("/")[2] + "/";
      if (!file) {
        return response(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      const fileExtension = file.originalname.split(".").pop();

      if (!document.includes(fileExtension)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Only .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt supported"
        );
      }
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: folderName + Date.now() + "_" + file.originalname.replace(/ /g, '_'),
        Body: file.buffer,
      };
      await s3
        .send(new PutObjectCommand(params))
        .then((data) => {
          return response(
            res,
            HTTP_STATUS.OK,
            "Successfully uploaded file",
            {...data, url: params.Key}
          );
        })
        .catch(() => {
          return response(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "failed to upload file"
          );
        });
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async getImage(req, res, next) {
    try {
      const key = req.params.key;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };
      const data = await s3.send(new GetObjectCommand(params));
      return response(res, HTTP_STATUS.OK, "Successfully fetched file", data);
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }

  }
}

module.exports = new FileController();
