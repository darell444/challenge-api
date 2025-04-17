import { z } from "zod";

export const createPollSchema = z.object({
  question: z.string().min(1, "Question is required"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  options: z
    .array(z.string().min(1, "Option text is required"))
    .min(1, "At least 1 option is required"),
});

export type CreatePollInput = z.infer<typeof createPollSchema>;