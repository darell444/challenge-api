import { prisma } from "../lib/prisma";
import { CreatePollInput } from "../schemas/poll.schema";

export const pollRepository = {
  async create(data: CreatePollInput) {
    const { options, ...pollData } = data;

    return prisma.poll.create({
      data: {
        ...pollData,
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: {
        options: true,
      },
    });
  },
};
