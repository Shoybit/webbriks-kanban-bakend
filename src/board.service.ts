import { prisma } from "./lib/prisma";

export const createBoard = async (name: string, ownerId: string) => {
  const board = await prisma.board.create({
    data: {
      name,
      ownerId,
      members: {
        create: {
          userId: ownerId,
        },
      },
    },
  });

  return board;
};

export const getUserBoards = async (userId: string) => {
  const boards = await prisma.board.findMany({
    where: {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return boards;
};

export const getBoardById = async (boardId: string, userId: string) => {
  const board = await prisma.board.findFirst({
    where: {
      id: boardId,
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
    include: {
      columns: {
        orderBy: {
          position: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  return board;
};