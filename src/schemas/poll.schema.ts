import { z } from "zod";

import { PollStatus } from "../domain/enums/poll-status";

export const createPollSchema = z.object({
  question: z.string().min(1, "Question is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  options: z
    .array(z.string().min(1, "Option text is required"))
    .min(3, "At least 3 options are required"),
});

export const updatePollSchema = z.object({
  question: z.string().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z.nativeEnum(PollStatus).optional(),
  options: z
    .array(z.string().min(1, "Option text is required"))
    .min(3, "At least 3 options are required")
    .optional(),
});

export const pollIdParamSchema = z.object({
  id: z.string().uuid("Invalid poll ID"),
});

export const pollStatusQuerySchema = z.object({
  status: z.nativeEnum(PollStatus).optional(),
});

export type CreatePollInput = z.infer<typeof createPollSchema>;
