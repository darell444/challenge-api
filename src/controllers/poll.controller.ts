import { Request, Response } from "express";
import PollService from "../services/poll.service";

class PollController {
  async create(req: Request, res: Response) {
    try {
      const poll = await PollService.create(req.body);
      res.status(201).json(poll);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
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

    try {
      await PollService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: "Poll not found" });
    }
  }

  async fetchAll(req: Request, res: Response) {
    try {
      const { status } = req.query;

      const polls = await PollService.fetchAll(status as string);
      res.status(200).json(polls);
    } catch (err: any) {
      console.error("Find All Polls Error:", err);
      res.status(500).json({
        message: err?.message || "Unexpected error while retrieving polls",
      });
    }
  }

  async vote(req: Request, res: Response) {
    const { id: pollId } = req.params;
    const { optionId } = req.body;

    try {
      await PollService.vote(pollId, optionId);
      res.status(204).send();
    } catch (err: any) {
      const status = err.message.includes("not found") ? 404 : 400;
      res.status(status).json({ message: err.message });
    }
  }
}

export default new PollController();
