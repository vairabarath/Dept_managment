import prisma from "../helper/prisma";
import { Prisma } from "@prisma/client";

const getStudents = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.StudentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "teacherId":
              query.class = {
                lessons: {
                  some: {
                    teacherId: value,
                  },
                },
              };
              break;
            case "search":
              query.name = {
                contains: value,
                mode: "insensitive",
              };
              break;
            default:
              break;
          }
        }
      }
    }

    const students = await prisma.student.findMany({
      where: query,
      include: {
        class: true,
        semester: true,
      },
      take: 10,
      skip: 10 * (page - 1),
    });

    const count = await prisma.student.count({ where: query });

    res.json({ students, count });
  } catch (error) {
    console.log(error);
  }
};

export { getStudents };
