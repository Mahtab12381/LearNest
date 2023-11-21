const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDB = require("./config/database");
const response = require("./utility/common");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors({origin:'*'}));

const AuthRouter = require("./routers/Auth");
const CartRouter = require("./routers/Cart");
const ReviewRouter = require("./routers/Review");
const UserRouter = require("./routers/User"); 
const CategoryRouter = require("./routers/Category");
const CourseRouter = require("./routers/Course");
const FileRouter = require("./routers/File");
const ContentRouter = require("./routers/Content");
const WishListRouter = require("./routers/WishList");
const TransactionRouter = require("./routers/Transaction");
const supportRouter = require("./routers/Support");
const assignmentRouter = require("./routers/Assignment");
const QuizRouter = require("./routers/Quiz");
const ProgressRouter = require("./routers/Progress");

const path = require("path");
const morgan = require('morgan')
const fs = require('fs');
const multer = require("multer");



var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })
function myCustomFormat(token,req, res,) {
  const formattedDate = new Date().toString();
  const endpoint = req.originalUrl;
  const requestInfo = {
    Method: req.method,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  };
  
let logMessage = `
${formattedDate}
Endpoint : ${endpoint}
Request:${JSON.stringify(requestInfo, null, 4)}
`;

if (res.statusCode >= 400) {
  logMessage+=`Error: ${res.locals.errorMessage} `
}

  return logMessage;
}
app.use(morgan((myCustomFormat), { stream: accessLogStream }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);
app.use("/api/reviews", ReviewRouter); 
app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/course", CourseRouter);
app.use("/api/files", FileRouter);
app.use("/api/content", ContentRouter);
app.use("/api/wishlist", WishListRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/support", supportRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/quiz", QuizRouter);
app.use("/api/progress", ProgressRouter);



app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof multer.MulterError) {
      return response(res, 404, err.message);
  } else {
      next(err);
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return response(res, 400, "Invalid JSON format");
  }
  next();
});

app.use((req, res) => {
    return response(res, 404, "Not Found");
  });

connectDB(() => {
  app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 8000!');
});
});

