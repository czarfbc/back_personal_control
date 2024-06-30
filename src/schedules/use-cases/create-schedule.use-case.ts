import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import { SanitizeAndCheckDate } from '../helpers/sanitize-and-check-date.helper';

@Injectable()
export class CreateScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  @Inject()
  private sanitizeAndCheckDate: SanitizeAndCheckDate;

  async execute(input: CreateScheduleInput) {
    const sanitizeAndCheckDate =
      await this.sanitizeAndCheckDate.sanitizeAndCheckDate(
        input.date,
        input.userId,
      );

    return await this.schedulesRepository.create({
      ...input,
      date: sanitizeAndCheckDate,
    });
  }
}
