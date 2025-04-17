import { Router } from "express";

import PollController from "../controllers/poll.controller";
import { validateSchema } from "../middlewares/validateSchema";
import * as zod from "../schemas/poll.schema";

const pollRoutes = Router();

pollRoutes.post(
  "/polls/",
  validateSchema(zod.createPollSchema),
  PollController.create
);

pollRoutes.put(
  "/polls/:id",
  validateSchema(zod.updatePollSchema),
  PollController.update
);

export default pollRoutes;
