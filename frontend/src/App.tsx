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
import SingleTeacher from "./pages/single/SingleTeacher";

const App = () => {
  const path = useLocation();
  console.log(path);
  return (
    <>
      <div className="h-screen flex">
        <div className="w-[15%] md:w-[8%] lg:w-[16%] xl:w-[15%] ">
          <Link to="/" className="flex items-center justify-start gap-2 p-4">
            <img src={assets.logo} alt="logo" width={32} height={32} />
            <span className="hidden lg:block">Something</span>
          </Link>
          <Menu />
        </div>
        <div className="w-[85%] md:w-[92%] lg:w-[84%] xl:w-[85%] bg-[#f5f5f5de] flex flex-col overflow-scroll">
          <Navbar />
          <Routes>
            <Route path="/parents" element={<Parent />} />
            <Route path="/teachers" element={<Teacher />} />
            <Route path="/students" element={<Student />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />

            {/* List Routes */}
            <Route path="data/teachers" element={<TeacherList />} />

            {/* Single Routes */}
            <Route path="data/teachers/:id" element={<SingleTeacher />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
