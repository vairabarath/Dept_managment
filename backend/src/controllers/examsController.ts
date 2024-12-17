import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getExams = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.ExamWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "classId":
              query.lesson = {
                classId: parseInt(value),
              };
              break;
            case "teacherId":
              query.lesson = {
                teacherId: value,
              };
              break;
            case "search":
              query.OR = [
                {
                  lesson: {
                    subject: { name: { contains: value, mode: "insensitive" } },
                  },
                },
              ];
              break;
            default:
              break;
          }
        }
      }
    }

    const exams = await prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true } },
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.exam.count({ where: query });

    res.json({ exams, count });
  } catch (error) {
    console.log(error);
  }
};

export { getExams };
