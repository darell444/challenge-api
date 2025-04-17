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
    const { options, ...rest } = data;

    // Atualiza apenas os campos do poll
    const updatedPoll = await prisma.poll.update({
      where: { id },
      data: rest,
      include: { options: true },
    });

    // Se options não for enviado, retornamos o poll como está
    if (!options) return updatedPoll;

    // Se options for enviado, substituímos todas as opções
    await prisma.option.deleteMany({ where: { pollId: id } });

    await prisma.option.createMany({
      data: options.map((text) => ({
        pollId: id,
        text,
      })),
    });

    // Retornamos o poll com as novas opções
    const pollWithNewOptions = await prisma.poll.findUnique({
      where: { id },
      include: { options: true },
    });

    return pollWithNewOptions!;
  },

  async delete(id: string) {
    // Prisma vai deletar automaticamente as options por relação (onDelete cascade)
    return prisma.poll.delete({
      where: { id },
    });
  },

  async getPollById(id: string) {
    return prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });
  },

  async getAllPolls() {
    return prisma.poll.findMany({
      include: {
        options: true,
      },
    });
  },
};
