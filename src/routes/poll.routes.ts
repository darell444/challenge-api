import { Router } from "express";

import PollController from "../controllers/poll.controller";
import { validateBody } from "../middlewares/validateBody";
import { validateParams } from "../middlewares/validateParams";
import * as zod from "../schemas/poll.schema";

const pollRouter = Router();

pollRouter.post(
  "/polls/",
  validateBody(zod.createPollSchema),
  PollController.create
);

pollRouter.put(
  "/polls/:id",
  validateParams(zod.pollIdParamSchema),
  validateBody(zod.updatePollSchema),
  PollController.update
);

pollRouter.delete(
  "/polls/:id",
  validateParams(zod.pollIdParamSchema),
  PollController.delete
);

pollRouter.get("/polls",validateParams(zod.pollStatusQuerySchema), PollController.fetchAll);

export default pollRouter;
