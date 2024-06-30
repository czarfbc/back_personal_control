import { Inject, Injectable } from '@nestjs/common';
import { RemoveSecondsOfDateHelper } from './remove-seconds-of-date.helper';
import { BeforeDateScheduleHelper } from './before-date-schedule.helper';
import { CheckIfDateIsAvailable } from './check-if-date-is-available.helper';

@Injectable()
export class SanitizeAndCheckDate {
  @Inject()
  private removeSecondsOfDateHelper: RemoveSecondsOfDateHelper;

  @Inject()
  private beforeDateScheduleHelper: BeforeDateScheduleHelper;

  @Inject()
  private checkIfDateIsAvailable: CheckIfDateIsAvailable;

  async sanitizeAndCheckDate(date: Date, userId: number) {
    const sanitizedDate = this.removeSecondsOfDateHelper.removeSeconds(date);

    this.beforeDateScheduleHelper.isBeforeDate(sanitizedDate, new Date());

    await this.checkIfDateIsAvailable.dateIsAvailable(sanitizedDate, userId);

    return sanitizedDate;
  }
}
