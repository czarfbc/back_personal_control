import { Inject, Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { endOfDay, startOfDay } from 'date-fns';

export interface ISchedulesRepository {
  create(schedule: Partial<Schedule>): Promise<Schedule>;
  findByDate(schedule: Partial<Schedule>): Promise<Schedule[]>;
  findFirst(schedule: Partial<Schedule>): Promise<Schedule>;
  findAll(schedule: Partial<Schedule>): Promise<Schedule[]>;
  update(schedule: Partial<Schedule>): Promise<Schedule>;
  delete(schedule: Partial<Schedule>): Promise<void>;
}

@Injectable()
export class SchedulesRepository implements ISchedulesRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(schedule: Schedule): Promise<Schedule> {
    return await this.prismaService.schedule.create({ data: schedule });
  }

  async findByDate(schedule: Schedule): Promise<Schedule[]> {
    return await this.prismaService.schedule.findMany({
      where: {
        date: {
          gte: startOfDay(schedule.date),
          lte: endOfDay(schedule.date),
        },
        userId: schedule.userId,
      },
    });
  }

  async findFirst(schedule: Schedule): Promise<Schedule> {
    return await this.prismaService.schedule.findFirst({
      where: {
        date: schedule.date,
        userId: schedule.userId,
      },
    });
  }

  async findAll(schedule: Schedule): Promise<Schedule[]> {
    return await this.prismaService.schedule.findMany({
      where: { userId: schedule.userId },
    });
  }

  async update(schedule: Schedule): Promise<Schedule> {
    return await this.prismaService.schedule.update({
      where: {
        id: schedule.id,
        userId: schedule.userId,
      },
      data: schedule,
    });
  }

  async delete(schedule: Schedule): Promise<void> {
    await this.prismaService.schedule.delete({
      where: {
        id: schedule.id,
        userId: schedule.userId,
      },
    });

    return;
  }
}
