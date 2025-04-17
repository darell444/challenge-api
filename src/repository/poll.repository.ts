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

  async update(id: string, data: Partial<CreatePollInput>) {
    return prisma.poll.update({
      where: { id },
      data,
      include: { options: true },
    });
  },

  async delete(id: string) {
    // Prisma vai deletar automaticamente as options por relação (onDelete cascade)
    return prisma.poll.delete({
      where: { id },
    });
  },
};
