import { assets } from "./assets";

export const menuItems = [
  {
    title: "Menu",
    items: [
      { icon: assets.home, label: "Home", href: "/" },

      { icon: assets.teacher, label: "Teachers", href: "/teacher" },
      { icon: assets.student, label: "Students", href: "/student" },
      { icon: assets.parent, label: "Parents", href: "/parent" },
      { icon: assets.Class, label: "Classes", href: "/classes" },
    ],
  },
];
