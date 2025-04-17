import { z } from "zod";

export const createPollSchema = z.object({
  question: z.string().min(1, "Question is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  options: z
    .array(z.string().min(1, "Option text is required"))
    .min(1, "At least 1 option is required"),
});

export const updatePollSchema = z.object({
  question: z.string().min(1).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z
    .enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "FINISHED"])
    .optional(),
});

export type CreatePollInput = z.infer<typeof createPollSchema>;