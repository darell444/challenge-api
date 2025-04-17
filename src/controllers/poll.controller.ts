import { Request, Response } from "express";
import PollService  from "../services/poll.service";

class PollController {
  async create(req: Request, res: Response) {
    const poll = await PollService.create(req.body);
    res.status(201).json(poll);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updated = await PollService.update(id, req.body);
      res.status(200).json(updated);
    } catch (err: any) {
      if (err.message === "Poll not found") {
        res.status(404).json({ message: err.message });
      }
      const statusCode = err.message.includes("NOT_STARTED") ? 403 : 400;
    res.status(statusCode).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await PollService.delete(id);

    res.status(204).send(); // No Content
  }

  async getAllPolls(req: Request, res: Response) {
    const polls = await PollService.getAllPolls();
    res.status(200).json(polls);
  }
};

export default new PollController();
