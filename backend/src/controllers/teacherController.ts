import { parse } from "path";
import prisma from "../helper/prisma";
import { Prisma } from "@prisma/client";

const getTeachers = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "classId":
              query.lessons = {
                some: {
                  classId: parseInt(value),
                },
              };
              break;
            default:
              break;
          }
        }
      }
    }

    const classId = queryParams.classId ? parseInt(queryParams.classId) : null;

    const teachers = await prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: 10,
      skip: 10 * (page - 1),
    });

    const count = await prisma.teacher.count({ where: query });

    res.json({ teachers, count });
  } catch (error) {
    console.log(error);
  }
};

export { getTeachers };
