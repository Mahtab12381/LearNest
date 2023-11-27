const response = require("../utility/common");
const jsonWebtoken = require("jsonwebtoken");
const isValidAdmin = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (valid && payload.data.role === "admin") {
      req.user = payload.data.user;
      req.role = payload.data.role;
      next();
    } else if (payload.data.role != "admin") {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidLearner = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (valid && payload.data.role === "learner") {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (payload.data.role != "learner") {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidInstructor = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (valid && payload.data.role === "instructor") {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (payload.data.role != "instructor") {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidAdminOrInstructor = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (
      valid &&
      (payload.data.role === "instructor" || payload.data.role === "admin")
    ) {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (
      payload.data.role != "instructor" ||
      payload.data.role != "admin"
    ) {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidAdminOrLearner = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (
      valid &&
      (payload.data.role === "learner" || payload.data.role === "admin")
    ) {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (payload.data.role != "learner" || payload.data.role != "admin") {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidLearnerOrInstructor = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (
      valid &&
      (payload.data.role === "learner" || payload.data.role === "instructor")
    ) {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (
      payload.data.role != "learner" ||
      payload.data.role != "instructor"
    ) {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

const isValidAdminOrLearnerOrInstructor = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return response(res, 401, "Access Restricted");
    }
    const token = req.headers.authorization.split(" ")[1];
    const valid = jsonWebtoken.verify(token, process.env.JWT_KEY);
    const payload = jsonWebtoken.decode(token);
    if (
      valid &&
      (payload.data.role === "learner" ||
        payload.data.role === "instructor" ||
        payload.data.role === "admin")
    ) {
      req.user = payload.data.user;
      req.role = payload.data.role;
      req.email = payload.data.email.id;
      next();
    } else if (
      payload.data.role != "learner" ||
      payload.data.role != "instructor" ||
      payload.data.role != "admin"
    ) {
      return response(res, 401, "Unauthorized Access");
    } else {
      throw new Error();
    }
  } catch (e) {
    if (e instanceof jsonWebtoken.TokenExpiredError) {
      return response(res, 401, "Please Login Again");
    } else if (e instanceof jsonWebtoken.JsonWebTokenError) {
      return response(res, 401, "Access Restricted");
    }

    return response(res, 500, "Internal server Error");
  }
};

module.exports = {
  isValidAdmin,
  isValidLearner,
  isValidInstructor,
  isValidAdminOrInstructor,
  isValidAdminOrLearner,
  isValidLearnerOrInstructor,
  isValidAdminOrLearnerOrInstructor,
};
