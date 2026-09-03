import { Response } from "express";
import { AuthRequest } from "./auth.middleware";
import {
  createTask,
  getColumnTasks,
} from "./task.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const columnId = String(req.params.columnId);
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await createTask(
      columnId,
      req.user!.userId,
      title,
      description
    );

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Column not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create task",
    });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const columnId = String(req.params.columnId);

    const tasks = await getColumnTasks(
      columnId,
      req.user!.userId
    );

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Column not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};