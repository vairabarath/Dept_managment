import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getClasses = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "inchargeId":
              query.inchargeId = value;
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

    const classes = await prisma.class.findMany({
      where: query,
      include: {
        incharge: true,
        semester: true,
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.class.count({ where: query });

    res.json({ classes, count });
  } catch (error) {
    console.log(error);
  }
};

export { getClasses };
