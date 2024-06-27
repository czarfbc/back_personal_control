import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { CreateScheduleInput } from '../dto/create-schedule.input';
import { BeforeDateScheduleHelper } from '../helpers/before-date-schedule.helper';
import { CheckIfDateIsAvailable } from '../helpers/check-if-date-is-available.helper';
import { RemoveSecondsOfDateHelper } from '../helpers/remove-seconds-of-date.helper';

@Injectable()
export class CreateScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  @Inject()
  private beforeDateScheduleHelper: BeforeDateScheduleHelper;

  @Inject()
  private checkIfDateIsAvailable: CheckIfDateIsAvailable;

  @Inject()
  private removeSecondsOfDateHelper: RemoveSecondsOfDateHelper;

  async execute(input: CreateScheduleInput) {
    const removeSeconds = this.removeSecondsOfDateHelper.removeSeconds(
      input.date,
    );

    this.beforeDateScheduleHelper.isBeforeDate(removeSeconds, new Date());

    await this.checkIfDateIsAvailable.dateIsAvailable(
      removeSeconds,
      input.userId,
    );

    return await this.schedulesRepository.create({
      ...input,
      date: removeSeconds,
    });
  }
}
