const Cart = require("../model/CartClass");
const Progress = require("../model/ProgressClass");
const Transaction = require("../model/TransactionClass");
const Notification = require("../model/Notification");
const User = require("../model/UserClass");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HTTP_STATUS = require("../constants/statusCodes");
const response = require("../utility/common");
const ejs = require("ejs");
const path = require("path");
const sendEmail = require("../utility/sendEmail");


class TransactionController {
  async add(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "User not found");
      }

      const extcart = await Cart.findOne({ learner: req.user._id });

      if (!extcart) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You have no item in the cart"
        );
      }

      if (extcart.courses.length == 0) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "You have no item in the cart"
        );
      }

      const transaction = {
        user: req.user._id,
        courses: extcart.courses,
        cart: extcart,
      };

      const newTransaction = await Transaction.create(transaction);
      if (newTransaction) {
        await Cart.findByIdAndDelete(extcart._id);
        const renderedHtml = await ejs.renderFile(
          path.join(__dirname, "../views/commonTemplete.ejs"),
          {
            header: "Subscription Information",
            name: process.env.ADMIN_NAME,
            body: "New Subscription request Arrived. Please check the details below:",
            link: process.env.VITE_REACT_BASE + "dashboard/admin/subscriptions",
            btnText: "View Subscription",
            footer: "Thanks for using our service.",
          }
        );
        sendEmail(process.env.ADMIN_EMAIL, "New Subscription Request", renderedHtml);

        await Notification.create({
          user: process.env.ADMIN_ID,
          message: "New Subscription request Arrived",
          type: "subscription",
          link: "/dashboard/admin/subscriptions",
        });

      }
      return response(
        res,
        HTTP_STATUS.CREATED,
        "Transaction added successfully",
        newTransaction
      );
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const transactions = await Transaction.find()
        .populate("user", "name email imageUrl")
        .populate("courses", "name _id rating thumbnail")
        .skip((page - 1) * limit)
        .limit(limit);
      if (transactions.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Transactions Data Received successfully",
          transactions
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transactions Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getById(req, res) {
    try {
      const transaction_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const transaction = await Transaction.findById(transaction_id);
      if (transaction) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Transaction Data Received successfully",
          transaction
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transaction Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getAllPending(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const transactions = await Transaction.find({ approved: false })
        .skip((page - 1) * limit)
        .limit(limit);
      if (transactions.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Transactions Data Received successfully",
          transactions
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transactions Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async approve(req, res) {
    try {
      const transaction_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const transaction = await Transaction.findById(transaction_id).populate("user", "name email imageUrl");
      if (transaction) {
        if (transaction.approved) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Subscription already approved"
          );
        }
        if (transaction.cancelled) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Transaction already Declined"
          );
        }
        const approvedTransaction = await Transaction.findByIdAndUpdate(
          transaction_id,
          { approved: true, cancelled: false },
          { new: true }
        );
        const extProgress = await Progress.findOne({
          user: approvedTransaction.user,
        });
        if (!extProgress) {
          let courseprogress = [];
          approvedTransaction.courses.forEach((course) => {
            courseprogress.push({
              course: course,
              percentageComplete: 0,
            });
          });
          const progress = {
            user: approvedTransaction.user,
            courseProgress: courseprogress,
          };
          await Progress.create(progress);
        } else {
          let courseprogress = extProgress.courseProgress;
          approvedTransaction.courses.forEach((course) => {
            courseprogress.push({
              course: course,
              percentageComplete: 0,
            });
          });
          await Progress.findByIdAndUpdate(extProgress._id, {
            courseProgress: courseprogress,
          });
        }

        const renderedHtml = await ejs.renderFile(
          path.join(__dirname, "../views/commonTemplete.ejs"),
          {
            header: "Subscription Information",
            name: transaction.user.name,
            body: "Your Subscription request has been approved. Please check the course below:",
            link: process.env.VITE_REACT_BASE + "dashboard/learner/mycourses",
            btnText: "View Course",
            footer: "Thanks for using our service.",
          }
        );
        sendEmail(transaction.user.email, "Subscription Approved", renderedHtml);

        await Notification.create({
          user: transaction.user,
          message: "Your Subscription request has been approved",
          type: "subscription",
          link: "/dashboard/learner/mycourses",
        });

        return response(
          res,
          HTTP_STATUS.OK,
          "Subscription Approved successfully",
          approvedTransaction
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transaction Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async approveOne(req, res) {
    try {
      const transaction_id = req.params.id;
      const course_id = req.params.course_id;
      if (
        !mongoose.Types.ObjectId.isValid(transaction_id) ||
        !mongoose.Types.ObjectId.isValid(course_id)
      ) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const transaction = await Transaction.findById(transaction_id);
      if (transaction) {
        if (transaction.approved) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Transaction already approved"
          );
        }
        const approvedTransaction = await Transaction.findByIdAndUpdate(
          transaction_id,
          { approved: true },
          { new: true }
        );
        const extProgress = await Progress.findOne({
          user: approvedTransaction.user,
        });
        if (!extProgress) {
          let courseprogress = [];
          approvedTransaction.courses.forEach((course) => {
            if (course == course_id) {
              courseprogress.push({
                course: course,
                percentageComplete: 0,
              });
            }
          });
          const progress = {
            user: approvedTransaction.user,
            courseProgress: courseprogress,
          };
          await Progress.create(progress);
        } else {
          let courseprogress = extProgress.courseProgress;
          approvedTransaction.courses.forEach((course) => {
            if (course == course_id) {
              courseprogress.push({
                course: course,
                percentageComplete: 0,
              });
            }
          });
          await Progress.findByIdAndUpdate(extProgress._id, {
            courseProgress: courseprogress,
          });
        }
        return response(
          res,
          HTTP_STATUS.OK,
          "Transaction Data Received successfully",
          approvedTransaction
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transaction Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async getMyTransaction(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response(res, HTTP_STATUS.BAD_REQUEST, errors.array());
      }
      const transactions = await Transaction.find({ user: req.user._id })
        .populate("user", "name email imageUrl")
        .populate("courses", "name _id rating thumbnail")
        .select("-__v -cart")
        .skip((page - 1) * limit)
        .limit(limit);
      if (transactions.length > 0) {
        return response(
          res,
          HTTP_STATUS.OK,
          "Transactions Data Received successfully",
          transactions
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transactions Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }

  async reject(req, res) {
    try {
      const transaction_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
        return response(res, HTTP_STATUS.BAD_REQUEST, "Invalid Id");
      }
      const transaction = await Transaction.findById(transaction_id).populate("user", "name email imageUrl");
      if (transaction) {
        if (transaction.approved) {
          return response(
            res,
            HTTP_STATUS.BAD_REQUEST,
            "Subscription already approved"
          );
        }
        if (transaction.cancelled) {
            return response(
              res,
              HTTP_STATUS.BAD_REQUEST,
              "Subscription already Declined"
            );
          }
        const cancelTransaction = await Transaction.findByIdAndUpdate(
          transaction_id,
          { cancelled: true, approved: false },
          { new: true }
        );

        const renderedHtml = await ejs.renderFile(
          path.join(__dirname, "../views/commonTemplete.ejs"),
          {
            header: "Subscription Information",
            name: transaction.user.name,
            body: "Your Subscription has been declined. To subscribe again please click the button below:",
            link: process.env.VITE_REACT_BASE + "courses",
            btnText: "View Courses",
            footer: "Thanks for using our service.",
          }
        );
        sendEmail(transaction.user.email, "Subscription Declined", renderedHtml);

        await Notification.create({
          user: transaction.user,
          message: "Your Subscription has been declined",
          type: "subscription",
          link: "/courses",
        });

        return response(
          res,
          HTTP_STATUS.OK,
          "Subscription Declined successfully",
          cancelTransaction
        );
      }
      return response(res, HTTP_STATUS.NOT_FOUND, "No Transaction Found");
    } catch (e) {
      return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Error");
    }
  }
}

module.exports = new TransactionController();
