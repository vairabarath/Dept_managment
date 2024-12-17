import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getAssignments = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.AssignmentWhereInput = {};

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

    const assignments = await prisma.assignment.findMany({
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

    const count = await prisma.assignment.count({ where: query });

    res.json({ assignments, count });
  } catch (error) {
    console.log(error);
  }
};

export { getAssignments };
