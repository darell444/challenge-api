import { Request, Response } from "express";
import PollService  from "../services/poll.service";

class PollController {
  async create(req: Request, res: Response) {
    const poll = await PollService.create(req.body);
    res.status(201).json(poll);
  }
};

export default new PollController();
