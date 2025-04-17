import { Router } from "express";

import PollController from "../controllers/poll.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { createPollSchema } from "../schemas/poll.schema";

const pollRoutes = Router();

pollRoutes.post(
  "/polls/",
  validateSchema(createPollSchema),
  PollController.create
);

export default pollRoutes;
