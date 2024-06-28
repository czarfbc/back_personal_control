import { Inject, Injectable } from '@nestjs/common';
import { Schedule } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface ISchedulesRepository {
  create(schedule: Partial<Schedule>): Promise<Schedule>;
  findByDate(schedule: Partial<Schedule>): Promise<Schedule[]>;
  findFirst(schedule: Partial<Schedule>): Promise<Schedule>;
  findAll(schedule: Partial<Schedule>): Promise<Schedule[]>;
  update(schedule: Partial<Schedule>): Promise<Schedule>;
  delete(schedule: Partial<Schedule>): Promise<void>;
  findById(todo: Partial<Schedule>): Promise<Schedule>;
}

@Injectable()
export class SchedulesRepository implements ISchedulesRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(schedule: Schedule): Promise<Schedule> {
    return await this.prismaService.schedule.create({ data: schedule });
  }

  async findByDate(schedule: Schedule): Promise<Schedule[]> {
    const START_HOUR = 0;
    const START_MINUTE = 0;
    const START_SECOND = 0;
    const START_MILLISECOND = 0;

    const END_HOUR = 23;
    const END_MINUTE = 59;
    const END_SECOND = 59;
    const END_MILLISECOND = 999;

    const startOfDay = new Date(schedule.date);
    startOfDay.setHours(
      START_HOUR,
      START_MINUTE,
      START_SECOND,
      START_MILLISECOND,
    );

    const endOfDay = new Date(schedule.date);
    endOfDay.setHours(END_HOUR, END_MINUTE, END_SECOND, END_MILLISECOND);

    return await this.prismaService.schedule.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
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

  async findById(todo: Schedule): Promise<Schedule> {
    return await this.prismaService.schedule.findUnique({
      where: { id: todo.id, userId: todo.userId },
    });
  }
}
