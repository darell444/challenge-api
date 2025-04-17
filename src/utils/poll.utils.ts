import { PollStatus } from "../domain/enums/poll-status";

export function calculatePollStatus(
  startDate: Date,
  endDate: Date
): PollStatus {
  const now = new Date();
  if (now < startDate) return PollStatus.NOT_STARTED;
  if (now > endDate) return PollStatus.FINISHED;
  return PollStatus.IN_PROGRESS;
}
