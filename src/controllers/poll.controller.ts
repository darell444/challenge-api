import { Request, Response } from "express";
import PollService  from "../services/poll.service";

class PollController {
  async create(req: Request, res: Response) {
    const poll = await PollService.create(req.body);
    res.status(201).json(poll);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const poll = await PollService.update(id, req.body);
    res.status(200).json(poll);
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
