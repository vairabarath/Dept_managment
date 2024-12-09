import { assets } from "../assets/assets";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: assets.home,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.teacher,
        label: "Teachers",
        href: "data/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: assets.student,
        label: "Students",
        href: "data/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: assets.parent,
        label: "Parents",
        href: "data/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: assets.subject,
        label: "Subjects",
        href: "data/subjects",
        visible: ["admin"],
      },
      {
        icon: assets.Class,
        label: "Classes",
        href: "data/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: assets.lesson,
        label: "Lessons",
        href: "data/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: assets.exam,
        label: "Exams",
        href: "data/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.assignment,
        label: "Assignments",
        href: "data/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.result,
        label: "Results",
        href: "data/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.attendance,
        label: "Attendance",
        href: "data/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.calendar,
        label: "Events",
        href: "data/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.message,
        label: "Messages",
        href: "data/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.announcement,
        label: "Announcements",
        href: "data/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: assets.profile,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.settings,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: assets.logout,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
