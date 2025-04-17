import { CreatePollInput } from "../schemas/poll.schema";
import { pollRepository } from "../repository/poll.repository";

class PollService {
  async create(data: CreatePollInput) {
    if (data.endDate <= data.startDate) {
      throw new Error("End date must be after start date");
    }

    return pollRepository.create(data);
  }

  async update(id: string, data: Partial<CreatePollInput>) {
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      throw new Error("End date must be after start date");
    }

    return pollRepository.update(id, data);
  }
  
  async delete(id: string) {
    return pollRepository.delete(id);
  }

  async getAllPolls() {
    return pollRepository.getAllPolls();
  }
}

export default new PollService();
