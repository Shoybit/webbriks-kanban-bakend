import { prisma } from "./lib/prisma";

export const createTask = async (
  columnId: string,
  userId: string,
  title: string,
  description?: string
) => {
  const column = await prisma.column.findFirst({
    where: {
      id: columnId,
      board: {
        OR: [
          { ownerId: userId },
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    },
  });

  if (!column) {
    throw new Error("Column not found");
  }

  const lastTask = await prisma.task.findFirst({
    where: {
      columnId,
    },
    orderBy: {
      position: "desc",
    },
  });

  const position = lastTask ? lastTask.position + 1 : 0;

  return prisma.task.create({
data: {
  title,
  ...(description !== undefined ? { description } : {}),
  position,
  columnId,
},
  });
};

export const getColumnTasks = async (
  columnId: string,
  userId: string
) => {
  const column = await prisma.column.findFirst({
    where: {
      id: columnId,
      board: {
        OR: [
          { ownerId: userId },
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    },
  });

  if (!column) {
    throw new Error("Column not found");
  }

  return prisma.task.findMany({
    where: {
      columnId,
    },
    orderBy: {
      position: "asc",
    },
  });
};