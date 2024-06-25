import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { CreateScheduleInput } from '../dto/create-schedule.input';

@Injectable()
export class CreateScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input: CreateScheduleInput) {
    const removeSeconds = this.removeSeconds(input.date);

    return await this.schedulesRepository.create({
      ...input,
      date: removeSeconds,
    });
  }

  removeSeconds(date: Date): Date {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);

    return newDate;
  }
}
