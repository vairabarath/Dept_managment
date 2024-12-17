import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getLessons = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.LessonWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "teacherId":
              query.teacherId = value;
              break;
            case "classId":
              query.classId = parseInt(value);
              break;
            case "search":
              query.OR = [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ];
              break;
            default:
              break;
          }
        }
      }
    }

    const lessons = await prisma.lesson.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
        teacher: { select: { name: true } },
        subject: { select: { name: true } },
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.lesson.count({ where: query });

    res.json({ lessons, count });
  } catch (error) {
    console.log(error);
  }
};

export { getLessons };
