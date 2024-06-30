import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { EditScheduleInfoInput } from '../dto/edit-schedule-info.input';
import { SanitizeAndCheckDate } from '../helpers/sanitize-and-check-date.helper';

@Injectable()
export class EditScheduleInfoUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  @Inject()
  private sanitizeAndCheckDate: SanitizeAndCheckDate;

  async execute(input: EditScheduleInfoInput) {
    if (input.date) {
      const sanitizeAndCheckDate =
        await this.sanitizeAndCheckDate.sanitizeAndCheckDate(
          input.date,
          input.userId,
        );

      return await this.schedulesRepository.update({
        ...input,
        date: sanitizeAndCheckDate,
      });
    }

    return await this.schedulesRepository.update(input);
  }
}
