import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getResults = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.ResultWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "studentId":
              query.Student = {
                id: value,
              };
              break;
            case "search":
              query.OR = [
                {
                  exam: {
                    title: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                  Student: {
                    name: {
                      contains: value,
                      mode: "insensitive",
                    },
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

    const results = await prisma.result.findMany({
      where: query,
      include: {
        Student: { select: { name: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.result.count({ where: query });

    res.json({ results, count });
  } catch (error) {
    console.log(error);
  }
};

export { getResults };
