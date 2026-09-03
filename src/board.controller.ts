import { Response } from "express";
import { AuthRequest } from "./auth.middleware";
import {
  createBoard,
  getBoardById,
  getUserBoards,
  updateBoard,
} from "./board.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Board name is required",
      });
    }

    const board = await createBoard(name, req.user!.userId);

    return res.status(201).json(board);
  } catch {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const boards = await getUserBoards(req.user!.userId);

    return res.status(200).json(boards);
  } catch {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
const boardId = req.params.id;

if (!boardId || Array.isArray(boardId)) {
  return res.status(400).json({
    message: "Invalid board ID",
  });
}

const board = await getBoardById(
  boardId,
  req.user!.userId
);
    return res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error && error.message === "Board not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const boardId = req.params.id;

    if (!boardId || Array.isArray(boardId)) {
      return res.status(400).json({
        message: "Invalid board ID",
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Board name is required",
      });
    }

    const board = await updateBoard(
      boardId,
      req.user!.userId,
      name
    );

    return res.status(200).json(board);
  } catch (error) {
    if (error instanceof Error && error.message === "Board not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};