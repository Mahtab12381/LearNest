const Notification = require("../model/Notification.js");
const response = require("../utility/common.js");
const HTTP_STATUS = require("../constants/statusCodes");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");


class NotificationController {

    async add (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Validation Error",errors.array())
            }
            const { user, message, type ,link } = req.body;
            const notification = await Notification.create({ user, message, type , link });
           return response(res, HTTP_STATUS.CREATED, "Notification added successfully", notification)
        } catch (error) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async getByuserID (req, res) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid user id")
            }
            const notification = await Notification.find({ user: id }).sort({ createdAt: -1 });
            return response(res, HTTP_STATUS.OK, "Notification fetched successfully", notification)
        } catch (error) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    async makeRead (req, res) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid notification id")
            }
            const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
            return response(res, HTTP_STATUS.OK, "Notification updated successfully", notification)
        } catch (error) {
            return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message)
        }
    }

}

module.exports = new NotificationController();
