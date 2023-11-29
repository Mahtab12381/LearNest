const { query, check } = require("express-validator");
const { body } = require("express-validator");

const authvalidator = {
  signUp: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("email.id")
      .exists()
      .withMessage("Email was not provided")
      .bail()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isString()
      .withMessage("Email must be a string")
      .bail()
      .isEmail()
      .withMessage("Email must be a valid email"),
    body("email.status")
      .not()
      .exists()
      .withMessage("Email status can not be provided"),
    body("address")
      .exists()
      .withMessage("Address was not provided")
      .bail()
      .notEmpty()
      .withMessage("Address cannot be empty")
      .bail()
      .isString()
      .withMessage("Address must be a string")
      .isLength({ max: 30 })
      .withMessage("Address cannot be more than 30 characters"),
    body("role")
      .exists()
      .withMessage("Role was not provided")
      .bail()
      .notEmpty()
      .withMessage("Role cannot be empty")
      .bail()
      .isString()
      .withMessage("Role must be a string")
      .bail()
      .isIn(["learner", "instructor"])
      .withMessage("Role must be either learner or instructor")
      .isLength({ max: 30 })
      .withMessage("Role cannot be more than 30 characters"),
    body("password")
      .exists()
      .withMessage("Password was not provided")
      .bail()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter,one number and one special character"
      ),
    body("cpassword")
      .exists()
      .withMessage("Confirm Password was not provided")
      .bail()
      .notEmpty()
      .withMessage("Confirm Password cannot be empty")
      .bail()
      .isString()
      .withMessage("Confirm Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Confirm Password must be at least 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm Password does not match Password");
        }
        return true;
      }),
  ],
  login: [
    body("email")
      .exists()
      .withMessage("Invalid Credential")
      .bail()
      .notEmpty()
      .withMessage("Invalid Credential")
      .bail()
      .isString()
      .withMessage("Invalid Credential")
      .bail()
      .isEmail()
      .withMessage("Invalid Credential"),
    body("password")
      .exists()
      .withMessage("Invalid Credential")
      .bail()
      .notEmpty()
      .withMessage("Invalid Credential")
      .bail()
      .isString()
      .withMessage("Invalid Credential"),
  ],
  send: [
    body("email")
      .exists()
      .withMessage("Email was not provided")
      .bail()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isString()
      .withMessage("Email must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Email cannot be more than 50 characters")
      .bail()
      .isEmail()
      .withMessage("Email must be a valid email"),
  ],
  checkToken: [
    body("token")
      .exists()
      .withMessage("Token was not provided")
      .bail()
      .notEmpty()
      .withMessage("Token cannot be empty")
      .bail()
      .isString()
      .withMessage("Token must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Token cannot be more than 50 characters"),

    body("id")
      .exists()
      .withMessage("Id was not provided")
      .bail()
      .notEmpty()
      .withMessage("Id cannot be empty")
      .bail()
      .isString()
      .withMessage("Id must be a string")
      .bail()
      .isMongoId()
      .withMessage("Id must be a valid mongo id"),
  ],
  resetPassword: [
    body("password")
      .exists()
      .withMessage("Password was not provided")
      .bail()
      .notEmpty()
      .withMessage("Password cannot be empty")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .isLength({ max: 32 })
      .withMessage("Password cannot be more than 32 characters")
      .bail()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter,one number and one special character"
      ),
    body("id")
      .exists()
      .withMessage("Id was not provided")
      .bail()
      .notEmpty()
      .withMessage("Id cannot be empty")
      .bail()
      .isString()
      .withMessage("Id must be a string")
      .bail()
      .isMongoId()
      .withMessage("Id must be a valid mongo id"),
    body("token")
      .exists()
      .withMessage("Token was not provided")
      .bail()
      .notEmpty()
      .withMessage("Token cannot be empty")
      .bail()
      .isString()
      .withMessage("Token must be a string")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Token cannot be more than 50 characters"),
  ],
};

const cartValidator = {
  add: [
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],
};

const reviewValidator = {
  add: [
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
    body("rating")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Review cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Rating must be a number")
      .bail()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an Integer number between 1 and 5"),
    body("review")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Review cannot be empty")
      .bail()
      .isString()
      .withMessage("Review must be a string")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Review cannot be more than 100 characters"),
  ],
};

const userValidator = {
  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("address")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Address cannot be empty")
      .bail()
      .isString()
      .withMessage("Address must be a string")
      .isLength({ max: 30 })
      .withMessage("Address cannot be more than 30 characters"),
    body("role")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Role cannot be empty")
      .bail()
      .isString()
      .withMessage("Role must be a string")
      .bail()
      .isIn(["learner", "instructor","admin"])
      .withMessage("Role "),
  ],
  updateProfile: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("address")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Address cannot be empty")
      .bail()
      .isString()
      .withMessage("Address must be a string")
      .isLength({ max: 30 })
      .withMessage("Address cannot be more than 30 characters"),
    body("city")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("City cannot be empty")
      .bail()
      .isString()
      .withMessage("City must be a string")
      .isLength({ max: 30 })
      .withMessage("City cannot be more than 30 characters"),
    body("country")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Country cannot be empty")
      .bail()
      .isString()
      .withMessage("Country must be a string")
      .isLength({ max: 30 })
      .withMessage("Country cannot be more than 30 characters"),
    body("number")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Number cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Number must be a number")
      .bail()
      .isLength({ max: 30 })
      .withMessage("Number cannot be more than 30 characters"),
    body("imageUrl")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("ImageUrl cannot be empty")
      .bail()
      .isString()
      .withMessage("ImageUrl must be a string")
      .isLength({ max: 100 })
      .withMessage("Image file name cannot be more than 100 characters"),
  ],
};

const pagelimitValidator = {
  pageLimit: [
    query("limit")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Limit cannot be empty")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer")
      .bail()
      .isLength({ max: 10 })
      .withMessage("Too long input"),
    query("page")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Page cannot be empty")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer")
      .bail()
      .isLength({ max: 10 })
      .withMessage("Too long input"),
  ],
};

const categoryValidator = {
  add: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("description")
      .exists()
      .withMessage("Description was not provided")
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 100 })
      .withMessage("Description cannot be more than 100 characters"),
    body("subcategories")
      .optional()
      .bail()
      .isArray()
      .withMessage("Subcategories must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((subcategory) => {
            if (typeof subcategory !== "string") {
              throw new Error("Subcategory must be a string");
            }
          });
        }
        return true;
      }),
  ],

  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("description")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 100 })
      .withMessage("Description cannot be more than 100 characters"),
    body("subcategories")
      .optional()
      .bail()
      .isArray()
      .withMessage("Subcategories must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((subcategory) => {
            if (typeof subcategory !== "string") {
              throw new Error("Subcategory must be a string");
            }
          });
        }
        if (value.length < 0) {
          throw new Error("Subcategory cannot be empty");
        }
        return true;
      }),
  ],
};

const courseValidator = {
  add: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .exists()
      .withMessage("Description was not provided")
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 10000 })
      .withMessage("Description cannot be more than 10000 characters"),
    body("category")
      .exists()
      .withMessage("Category was not provided")
      .bail()
      .notEmpty()
      .withMessage("Category cannot be empty")
      .bail()
      .isString()
      .withMessage("Category must be a string")
      .bail()
      .isMongoId()
      .withMessage("Category must be a valid mongo id"),
    body("subcategory")
      .exists()
      .withMessage("Subcategory was not provided")
      .bail()
      .notEmpty()
      .withMessage("Subcategory cannot be empty")
      .bail()
      .isString()
      .withMessage("Subcategory must be a string"),
    body("language")
      .exists()
      .withMessage("Language was not provided")
      .bail()
      .notEmpty()
      .withMessage("Language cannot be empty")
      .bail()
      .isString()
      .withMessage("Language must be a string"),
    body("tag")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Tag cannot be empty")
      .bail()
      .isString()
      .withMessage("Tag must be a string"),
    body("level")
      .exists()
      .withMessage("Level was not provided")
      .bail()
      .notEmpty()
      .withMessage("Level cannot be empty")
      .bail()
      .isString()
      .withMessage("Level must be a string"),
    body("thumbnail")
      .exists()
      .withMessage("Thumbnail was not provided")
      .bail()
      .notEmpty()
      .withMessage("Thumbnail cannot be empty")
      .bail()
      .isString()
      .withMessage("Thumbnail must be a string"),
    body("sections")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Sections cannot be empty")
      .bail()
      .isArray()
      .withMessage("Sections must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((section) => {
            if (typeof section !== "string") {
              throw new Error("Section must be a string");
            }
          });
        }
        return true;
      }),
  ],

  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 10000 })
      .withMessage("Description cannot be more than 10000 characters"),
    body("category")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Category cannot be empty")
      .bail()
      .isString()
      .withMessage("Category must be a string")
      .bail()
      .isMongoId()
      .withMessage("Category must be a valid mongo id"),
    body("subcategory")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Subcategory cannot be empty")
      .bail()
      .isString()
      .withMessage("Subcategory must be a string"),
    body("created_by")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Created by cannot be empty")
      .bail()
      .isString()
      .withMessage("Created by must be a string")
      .bail()
      .isMongoId()
      .withMessage("Created by must be a valid mongo id"),
    body("thumbnail")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Thumbnail cannot be empty")
      .bail()
      .isString()
      .withMessage("Thumbnail must be a string"),
    body("level")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Level cannot be empty")
      .bail()
      .isString()
      .withMessage("Level must be a string"),
    body("language")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Language cannot be empty")
      .bail()
      .isString()
      .withMessage("Language must be a string"),
    body("tag")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Tag cannot be empty")
      .bail()
      .isString()
      .withMessage("Tag must be a string"),
    body("sections")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Sections cannot be empty")
      .bail()
      .isArray()
      .withMessage("Sections must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((section) => {
            if (typeof section !== "string") {
              throw new Error("Section must be a string");
            }
          });
        }
        return true;
      }),
  ],
};

const contentValidator = {
  add: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .exists()
      .withMessage("Description was not provided")
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 500 })
      .withMessage("Description cannot be more than 500 characters"),
    body("data")
      .exists()
      .withMessage("Data was not provided")
      .bail()
      .notEmpty()
      .withMessage("Data cannot be empty")
      .bail()
      .isString()
      .withMessage("Data must be a string"),
    body("type")
      .exists()
      .withMessage("Type was not provided")
      .bail()
      .notEmpty()
      .withMessage("Type cannot be empty")
      .bail()
      .isString()
      .withMessage("Type must be a string")
      .bail()
      .isIn(["video", "document"])
      .withMessage("Type must be either video or document"),
    body("section")
      .exists()
      .withMessage("Lesson was not provided")
      .bail()
      .notEmpty()
      .withMessage("Lesson cannot be empty")
      .bail()
      .isString()
      .withMessage("Lesson must be a string")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Lesson cannot be more than 100 characters"),
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),

    body("attachment")
      .optional()
      .bail()
      .isArray()
      .withMessage("Attachment must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((attachment) => {
            if (typeof attachment !== "string") {
              throw new Error("Attachment must be a string");
            }
          });
        }
        return true;
      }),
  ],

  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 500 })
      .withMessage("Description cannot be more than 500 characters"),
    body("data")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Data cannot be empty")
      .bail()
      .isString()
      .withMessage("Data must be a string"),
    body("type")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Type cannot be empty")
      .bail()
      .isString()
      .withMessage("Type must be a string")
      .bail()
      .isIn(["video", "audio", "pdf", "image"])
      .withMessage("Type must be either video, audio, pdf or image"),
    body("course")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
    body("section")
      .exists()
      .withMessage("Section was not provided")
      .bail()
      .notEmpty()
      .withMessage("Section cannot be empty")
      .bail()
      .isString()
      .withMessage("Section must be a string")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Section cannot be more than 100 characters"),
    body("attachment")
      .optional()
      .bail()
      .isArray()
      .withMessage("Attachment must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((attachment) => {
            if (typeof attachment !== "string") {
              throw new Error("Attachment must be a string");
            }
          });
        }
        return true;
      }),
  ],
};

const wishlistValidator = {
  add: [
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],
};

const supportValidator = {
  add: [
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
    body("message")
      .exists()
      .withMessage("Message was not provided")
      .bail()
      .notEmpty()
      .withMessage("Message cannot be empty")
      .bail()
      .isString()
      .withMessage("Message must be a string"),
  ],
};

const assignmentValidator = {
  add: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .exists()
      .withMessage("Description was not provided")
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 150 })
      .withMessage("Description cannot be more than 150 characters"),
    body("attachments")
      .optional()
      .bail()
      .isArray()
      .withMessage("Attachments must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((attachment) => {
            if (typeof attachment !== "string") {
              throw new Error("Attachment must be a string");
            }
            if (attachment.length > 100) {
              throw new Error("Attachment cannot be more than 100 characters");
            }
            if (attachment.length < 1) {
              throw new Error("Attachment cannot be empty");
            }
          });
        }
        return true;
      }),
    body("mark")
      .exists()
      .withMessage("Mark was not provided")
      .bail()
      .notEmpty()
      .withMessage("Mark cannot be empty")
      .bail()
      .isInt()
      .withMessage("Mark must be a number")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Mark cannot be more than 100 characters"),
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],
  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 100 })
      .withMessage("Name cannot be more than 100 characters"),
    body("description")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 150 })
      .withMessage("Description cannot be more than 150 characters"),
    body("attachments")
      .optional()
      .bail()
      .isArray()
      .withMessage("Attachments must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((attachment) => {
            if (typeof attachment !== "string") {
              throw new Error("Attachment must be a string");
            }
            if (attachment.length > 100) {
              throw new Error("Attachment cannot be more than 100 characters");
            }
            if (attachment.length < 1) {
              throw new Error("Attachment cannot be empty");
            }
          });
        }
        return true;
      }),
    body("mark")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Mark cannot be empty")
      .bail()
      .isInt()
      .withMessage("Mark must be a Number")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Mark cannot be more than 100 characters"),
    body("course")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],
  score: [
    body("score")
      .exists()
      .withMessage("Score was not provided")
      .bail()
      .notEmpty()
      .withMessage("Score cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Score must be a number")
      .bail()
      .isLength({ max: 6 })
      .withMessage("Score cannot be more than 4 characters"),
    body("feedback")
      .exists()
      .withMessage("Feedback was not provided")
      .bail()
      .notEmpty()
      .withMessage("Feedback cannot be empty")
      .bail()
      .isString()
      .withMessage("Feedback must be a string")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Feedback cannot be more than 100 characters"),
  ],
};

const quizValidator = {
  add: [
    body("name")
      .exists()
      .withMessage("Name was not provided")
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("description")
      .exists()
      .withMessage("Description was not provided")
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 100 })
      .withMessage("Description cannot be more than 100 characters"),
    body("questions")
      .exists()
      .withMessage("Questions was not provided")
      .bail()
      .notEmpty()
      .withMessage("Questions cannot be empty")
      .bail()
      .isArray()
      .withMessage("Questions must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((question) => {
            if (typeof question.questionText !== "string") {
              throw new Error("Question must be a string");
            }
            if (question.questionText.length > 100) {
              throw new Error("Question cannot be more than 100 characters");
            }
            if (question.questionText.length < 1) {
              throw new Error("Question cannot be empty");
            }
            if (typeof question.options !== "object") {
              throw new Error("Options must be an array");
            }
            if (question.options.length < 1) {
              throw new Error("Options cannot be empty");
            }
            if (typeof question.correctAnswer !== "number") {
              throw new Error("Correct Answer must be a Number");
            }
            if (question.correctAnswer.length > 100) {
              throw new Error(
                "Correct Answer cannot be more than 100 characters"
              );
            }
            if (question.correctAnswer.length < 1) {
              throw new Error("Correct Answer cannot be empty");
            }
          });
        }
        return true;
      }),
    body("timeLimit")
      .exists()
      .withMessage("Time limit was not provided")
      .bail()
      .notEmpty()
      .withMessage("Time limit cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Time limit must be a number")
      .bail()
      .isLength({ max: 6 })
      .withMessage("Time limit cannot be more than 4 characters"),
    body("course")
      .exists()
      .withMessage("Course was not provided")
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],

  update: [
    body("name")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 30 })
      .withMessage("Name cannot be more than 30 characters"),
    body("description")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Description cannot be empty")
      .bail()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ max: 100 })
      .withMessage("Description cannot be more than 100 characters"),
    body("questions")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Questions cannot be empty")
      .bail()
      .isArray()
      .withMessage("Questions must be an array")
      .bail()
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((question) => {
            if (typeof question.questionText !== "string") {
              throw new Error("Question must be a string");
            }
            if (question.questionText.length > 100) {
              throw new Error("Question cannot be more than 100 characters");
            }
            if (question.questionText.length < 1) {
              throw new Error("Question cannot be empty");
            }
            if (typeof question.options !== "object") {
              throw new Error("Options must be an array");
            }
            if (question.options.length < 1) {
              throw new Error("Options cannot be empty");
            }
            if (typeof question.correctAnswer !== "number") {
              throw new Error("Correct Answer must be a Number");
            }
            if (question.correctAnswer.length > 100) {
              throw new Error(
                "Correct Answer cannot be more than 100 characters"
              );
            }
            if (question.correctAnswer.length < 1) {
              throw new Error("Correct Answer cannot be empty");
            }
          });
        }
        return true;
      }),
    body("timeLimit")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Time limit cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Time limit must be a number")
      .bail()
      .isLength({ max: 6 })
      .withMessage("Time limit cannot be more than 4 characters"),
    body("course")
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Course cannot be empty")
      .bail()
      .isString()
      .withMessage("Course must be a string")
      .bail()
      .isMongoId()
      .withMessage("Course must be a valid mongo id"),
  ],
  submit: [
    body("answers")
      .exists()
      .withMessage("Answers was not provided")
      .bail()
      .notEmpty()
      .withMessage("Answers cannot be empty")
      .bail()
      .isArray()
      .withMessage("Answers must be an array")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Answers cannot be more than 100 characters")
      .custom((value) => {
        if (value.length > 0) {
          value.forEach((answer) => {
            if (typeof answer !== "number") {
              throw new Error("Answer must be a Number");
            }
            if (answer.length > 2) {
              throw new Error("Answer cannot be more than 2 characters");
            }
            if (answer.length < 1) {
              throw new Error("Answer cannot be empty");
            }
          });
        }
        if (value.length < 1) {
          throw new Error("Answers cannot be empty");
        }
        return true;
      }),
  ],
};


const notificationValidator={
  add:[
    body("user")
    .exists()
    .withMessage("User was not provided")
    .bail()
    .notEmpty()
    .withMessage("User cannot be empty")
    .bail()
    .isString()
    .withMessage("User must be a string")
    .bail()
    .isMongoId()
    .withMessage("User must be a valid mongo id"),
    body("message")
    .exists()
    .withMessage("Message was not provided")
    .bail()
    .notEmpty()
    .withMessage("Message cannot be empty")
    .bail()
    .isString()
    .withMessage("Message must be a string")
    .isLength({ max: 300 })
    .withMessage("Message cannot be more than 300 characters"),
    body("type")
    .exists()
    .withMessage("Type was not provided")
    .bail()
    .notEmpty()
    .withMessage("Type cannot be empty")
    .bail()
    .isString()
    .withMessage("Type must be a string"),
  body("link")
    .optional()
    .bail()
    .notEmpty()
    .withMessage("Link cannot be empty")
    .bail()
    .isString()
    .withMessage("Link must be a string")
    .isLength({ max: 100 })
    .withMessage("Link cannot be more than 100 characters"),
  ],
}
module.exports = {
  authvalidator,
  cartValidator,
  reviewValidator,
  userValidator,
  pagelimitValidator,
  categoryValidator,
  courseValidator,
  contentValidator,
  wishlistValidator,
  supportValidator,
  assignmentValidator,
  quizValidator,
  notificationValidator
};
