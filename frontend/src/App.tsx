import { Routes, Route, useLocation, Link } from "react-router-dom";
import { assets } from "./assets/assets";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Parent from "./pages/Parent";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import TeacherList from "./pages/menuList/TeacherList";
import StudentList from "./pages/menuList/StudentList";
import ParentList from "./pages/menuList/ParentList";
import SubjectList from "./pages/menuList/SubjectList";
import ClassList from "./pages/menuList/ClassList";
import LessonsList from "./pages/menuList/LessonsList";
import ExamList from "./pages/menuList/ExamsList";
import AssignmentList from "./pages/menuList/AssignmentList";
import ResultList from "./pages/menuList/ResultList";
import EventList from "./pages/menuList/EventList";
import AnnouncementList from "./pages/menuList/AnnouncementList";

const App = () => {
  const path = useLocation();
  console.log(path);
  return (
    <>
      <div className="h-screen flex">
        <div className="w-[15%] md:w-[8%] lg:w-[16%] xl:w-[15%] ">
          <Link to="/" className="flex items-center justify-start gap-2 p-4">
            <img src={assets.logo} alt="logo" width={32} height={32} />
            <span className="hidden lg:block text-white">Something</span>
          </Link>
          <Menu />
        </div>
        <div className="w-[85%] md:w-[92%] lg:w-[84%] xl:w-[85%] bg-[#121212] flex flex-col overflow-scroll">
          <Navbar />
          <Routes>
            <Route path="/parents" element={<Parent />} />
            <Route path="/teachers/:id" element={<Teacher />} />
            <Route path="/students/:id" element={<Student />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />

            {/* List Routes */}
            <Route path="data/teachers" element={<TeacherList />} />
            <Route path="data/students" element={<StudentList />} />
            <Route path="data/parents" element={<ParentList />} />
            <Route path="data/subjects" element={<SubjectList />} />
            <Route path="data/classes" element={<ClassList />} />
            <Route path="data/lessons" element={<LessonsList />} />
            <Route path="data/exams" element={<ExamList />} />
            <Route path="data/assignments" element={<AssignmentList />} />
            <Route path="data/results" element={<ResultList />} />
            <Route path="data/events" element={<EventList />} />
            <Route path="data/announcements" element={<AnnouncementList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
