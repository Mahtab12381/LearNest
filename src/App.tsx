import Navbar from "./Components/organisms/Nav/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./Components/templates/Signin";
import Signup from "./Components/templates/Signup";
import Home from "./Components/templates/Home";
import About from "./Components/templates/About";
import Contact from "./Components/templates/Contact";
import AdminAuth from "./Utils/AdminAuth";
import LearnerAuth from "./Utils/LearnerAuth";
import InstructorAuth from "./Utils/InstructorAuth";
import ForgetPassword from "./Components/templates/ForgetPassword";
import ResetPassword from "./Components/templates/ResetPassword";
import Footer from "./Components/organisms/Others/Footer";
import Courses from "./Components/templates/Courses";
import InstructorDashboard from "./Components/templates/InstructorDashboard";
import MyCourseOrganism from "./Components/organisms/Course/MyCourseOrganism";
import CreateCourse from "./Components/organisms/Course/CreateCourse";
import CourseDetails from "./Components/templates/CourseDetails";
import AdminDashboard from "./Components/templates/AdminDashboard";
import AdminCourseOrganism from "./Components/organisms/Course/AdminCourseOrganism";
import LearnerDashboard from "./Components/templates/LearnerDashboard";
import TransactionOrganism from "./Components/organisms/Transaction/TransactionOrganism";
import MyEnrolledCourseOrganism from "./Components/organisms/Course/MyEnrolledCourseOrganism";
import CourseContentView from "./Components/organisms/Course/CourseContentView";
import AssignmentOrganism from "./Components/organisms/Assignment/AssignmentOrganism";
import AssignmentCreatrionOrganism from "./Components/organisms/Assignment/AssignmentCreatrionOrganism";
import AssignmentSubmissionView from "./Components/organisms/Assignment/AssignmentSubmissionView";
import QuizListOrganism from "./Components/organisms/Quiz/QuizListOrganism";
import AddQuizOrganism from "./Components/molecules/Quiz/AddQuizOrganism";
import DisplayQuizOrganism from "./Components/organisms/Quiz/DisplayQuizOrganism";
import MySubscriptions from "./Components/organisms/Transaction/MySubscriptions";
import ProfileOrganism from "./Components/organisms/Profile/ProfileOrganism";
import ProfileEdit from "./Components/organisms/Profile/ProfileEdit";
import UserListOrganism from "./Components/organisms/User/UserListOrganism";
import Dashboard from "./Components/organisms/Others/Dashboard";
import ProfilePage from "./Components/molecules/Profile/ProfileMolecule";
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        style={{
          bottom: "16px",
          right: "16px",
        }}
      />
      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="flex-none w-full">
            <Navbar />
          </div>
          <div className="grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/forget_password" element={<ForgetPassword />} />
              <Route
                path="/reset_password/:token/:id"
                element={<ResetPassword />}
              />

              <Route element={<AdminAuth />}>
                <Route path="/dashboard/admin" element={<AdminDashboard />}>
                  <Route
                    path="/dashboard/admin"
                    element={<Dashboard/>}
                  />
                  <Route
                    path="/dashboard/admin/courses"
                    element={<AdminCourseOrganism />}
                  />
                  <Route
                    path="/dashboard/admin/users"
                    element={<UserListOrganism/>}
                  />
                  <Route
                    path="/dashboard/admin/categories"
                    element={<h1 className="mt-[68px]">Categories</h1>}
                  />
                  <Route
                    path="/dashboard/admin/myprofile"
                    element={<ProfileOrganism />}
                  />
                  <Route
                    path="/dashboard/admin/myprofile/edit"
                    element={<ProfileEdit />}
                  />
                  <Route
                    path="/dashboard/admin/subscriptions"
                    element={<TransactionOrganism />}
                  />
                </Route>
              </Route>

              <Route element={<LearnerAuth />}>
                <Route path="/dashboard/learner" element={<LearnerDashboard />}>
                  <Route
                    path="/dashboard/learner"
                    element={<ProfileOrganism/>}
                  />
                  <Route
                    path="/dashboard/learner/mycourses"
                    element={<MyEnrolledCourseOrganism />}
                  />
                  <Route
                    path="/dashboard/learner/mycourses/:id"
                    element={<CourseContentView />}
                  />
                  <Route
                    path="/dashboard/learner/quiz-view/:id"
                    element={<DisplayQuizOrganism />}
                  />
                  <Route
                    path="/dashboard/learner/myprofile"
                    element={<ProfileOrganism />}
                  />
                  <Route
                    path="/dashboard/learner/myprofile/edit"
                    element={<ProfileEdit />}
                  />

                  <Route
                    path="/dashboard/learner/mysubscriptions"
                    element={<MySubscriptions />}
                  />
                </Route>
              </Route>

              <Route element={<InstructorAuth />}>
                <Route
                  path="/dashboard/instructor"
                  element={<InstructorDashboard />}
                >
                  <Route
                    path="/dashboard/instructor"
                    element={<ProfileOrganism/>}
                  />
                  <Route
                    path="/dashboard/instructor/quiz"
                    element={<QuizListOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/quiz/add"
                    element={<AddQuizOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/quiz-view/:id"
                    element={<DisplayQuizOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/assignment"
                    element={<AssignmentOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/assignment/add"
                    element={<AssignmentCreatrionOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/mycourses/add"
                    element={<CreateCourse />}
                  ></Route>

                  <Route
                    path="/dashboard/instructor/mycourses"
                    element={<MyCourseOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/assignment-submissions-view/:id"
                    element={<AssignmentSubmissionView />}
                  />

                  <Route
                    path="/dashboard/instructor/myprofile"
                    element={<ProfileOrganism />}
                  />

                  <Route
                    path="/dashboard/instructor/myprofile/edit"
                    element={<ProfileEdit />}
                  />
                </Route>
              </Route>

              <Route path="*" element={<h1 className="mt-[68px]">404</h1>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
