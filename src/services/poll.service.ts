import { CreatePollInput } from "../schemas/poll.schema";
import { pollRepository } from "../repository/poll.repository";
import { PollStatus } from "../domain/enums/poll-status";
import { calculatePollStatus } from "../lib/poll.utils";

class PollService {
  async create(data: CreatePollInput) {
    if (data.endDate <= data.startDate) {
      throw new Error("End date must be after start date");
    }

    return pollRepository.create(data);
  }

  async update(id: string, data: Partial<CreatePollInput>) {
    const existingPoll = await pollRepository.getPollById(id);

    if (!existingPoll) {
      throw new Error("Poll not found");
    }

    const currentStatus = existingPoll.status;
    calculatePollStatus(existingPoll.startDate, existingPoll.endDate);

    if (currentStatus !== PollStatus.NOT_STARTED) {
      throw new Error("Polls that have started cannot be updated");
    }

    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      throw new Error("End date must be after start date");
    }

    return pollRepository.update(id, data);
  }

  async delete(id: string) {
    return pollRepository.delete(id);
  }

  async fetchAll(filterStatus?: string) {
    const polls = await pollRepository.fetchAll();

    const result = await Promise.all(
      polls.map(async (poll: { id: string; startDate: Date; endDate: Date; status: string }) => {
        const calculatedStatus: PollStatus = calculatePollStatus(
          poll.startDate,
          poll.endDate
        );

        // Atualiza o status no banco apenas se estiver diferente
        if (poll.status !== calculatedStatus) {
          await pollRepository.updateStatus(poll.id, calculatedStatus);
        }

        return {
          ...poll,
          status: calculatedStatus,
        };
      })
    );

    // Filtro por status se for passado
    return result.filter((poll) => {
      if (!filterStatus) return true;
      return poll.status === filterStatus;
    });
  }
}

export default new PollService();
