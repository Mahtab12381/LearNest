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
      .isIn(["user", "premium_user"])
      .withMessage("Role must be either user or premium_user"),
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
      .isLength({ max: 500 })
      .withMessage("Description cannot be more than 500 characters"),
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
      .optional()
      .bail()
      .notEmpty()
      .withMessage("Subcategory cannot be empty")
      .bail()
      .isString()
      .withMessage("Subcategory must be a string"),
    body("created_by")
      .exists()
      .withMessage("Created by was not provided")
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
      .exists()
      .withMessage("Thumbnail was not provided")
      .bail()
      .notEmpty()
      .withMessage("Thumbnail cannot be empty")
      .bail()
      .isString()
      .withMessage("Thumbnail must be a string"),

    body("sections")
      .exists()
      .withMessage("Sections was not provided")
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
      .isLength({ max: 500 })
      .withMessage("Description cannot be more than 500 characters"),
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
      .isIn(["video", "audio", "pdf", "image"])
      .withMessage("Type must be either video, audio, pdf or image"),
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
  add : [
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
      .withMessage("Message must be a string")
  ]
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
  supportValidator
};
