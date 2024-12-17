import { Prisma } from "@prisma/client";
import prisma from "../helper/prisma";

const getAnnouncements = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page!);
    const queryParams = req.query;

    const query: Prisma.AnnouncementWhereInput = {};

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (typeof value === "string" && value !== undefined) {
          switch (key) {
            case "search":
              query.title = {
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

    const announcements = await prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    const count = await prisma.announcement.count({ where: query });

    res.json({ announcements, count });
  } catch (error) {
    console.log(error);
  }
};

export { getAnnouncements };
