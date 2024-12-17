import { parse } from "path";
import prisma from "../helper/prisma";
import { Prisma } from "@prisma/client";

const getParents = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.ParentWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "classId":
              query.students = {
                some: {
                  classId: parseInt(value),
                },
              };
              break;
            case "search":
              query.name = {
                contains: value,
                mode: "insensitive",
              };
            default:
              break;
          }
        }
      }
    }

    const classId = queryParams.classId ? parseInt(queryParams.classId) : null;

    const parents = await prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: 10,
      skip: 10 * (page - 1),
    });

    const count = await prisma.parent.count({ where: query });

    res.json({ parents, count });
  } catch (error) {
    console.log(error);
  }
};

export { getParents };
