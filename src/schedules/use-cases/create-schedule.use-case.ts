import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { CreateScheduleInput } from '../dto/create-schedule.input';

@Injectable()
export class CreateScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input: CreateScheduleInput) {
    const removeSeconds = this.removeSeconds(input.date);

    this.isBeforeDate(removeSeconds, new Date());

    await this.checkIfDateIsAvailable(removeSeconds, input.userId);

    return await this.schedulesRepository.create({
      ...input,
      date: removeSeconds,
    });
  }

  isBeforeDate(date: Date, compareDate: Date) {
    const isBefore = date.getTime() < compareDate.getTime();

    if (isBefore) {
      throw new Error('Old date is not allowed');
    }

    return isBefore;
  }

  async checkIfDateIsAvailable(date: Date, userId: number) {
    const dateExists = await this.schedulesRepository.findByDate({
      date,
      userId,
    });

    console.log(dateExists);

    if (dateExists.length > 0) {
      throw new Error('Date already exists');
    }

    return;
  }

  removeSeconds(date: Date): Date {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);

    return newDate;
  }
}
