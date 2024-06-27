import { Injectable } from '@nestjs/common';

@Injectable()
export class BeforeDateScheduleHelper {
  isBeforeDate(date: Date, compareDate: Date) {
    const isBefore = date.getTime() < compareDate.getTime();

    if (isBefore) {
      throw new Error('Old date is not allowed');
    }

    return isBefore;
  }
}
