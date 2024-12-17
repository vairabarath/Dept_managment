import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getSubjects = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.SubjectWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
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

    const subjects = await prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.subject.count({ where: query });

    res.json({ subjects, count });
  } catch (error) {
    console.log(error);
  }
};

export { getSubjects };
