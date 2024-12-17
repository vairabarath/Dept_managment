type Parent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  students: Student[];
};

type Teacher = {
  id: string;
  name: string;
  email: string;
  phone: string;
  img: string;
  subjects: Subjects[];
  classes: Classes[];
  address: string;
};

type Subjects = {
  id: number;
  name: string;
  teachers: Teacher[];
};

type Student = {
  id: string;
  studentId: string;
  name: string;
  email: string;
  img: string;
  phone: string;
  class: Classes;
  semester: Semester;
  address: string;
};

type Semester = {
  id: number;
  level: number;
};

type Classes = {
  id: number;
  name: string;
  capacity: 19;
  incharge: Teacher;
  semester: Semester;
};

type Lessons = {
  id: number;
  name: string;
  subject: Subjects;
  class: Classes;
  teacher: Teacher;
  day: string;
};

type Exams = {
  id: number;
  title: string;
  lesson: Lessons;
  result: Results[];
  startTime: string;
};

type Results = {
  id: number;
  score: number;
  exam: Exams;
  assignment: Assignments;
  Student: Student;
};

type Assignments = {
  id: number;
  title: string;
  startDate: string;
  dueDate: string;
  lesson: Lessons;
  result: Results[];
};

type Events = {
  id: number;
  title: string;
  class: Classes;
  startTime: Date;
  endTime: Date;
};

type Announcements = {
  id: number;
  title: string;
  class: Classes;
  date: Date;
};

export type {
  Parent,
  Student,
  Semester,
  Classes,
  Teacher,
  Subjects,
  Lessons,
  Exams,
  Results,
  Assignments,
  Events,
  Announcements,
};
