import { Injectable } from '@nestjs/common';

@Injectable()
export class SetUTCHoursToFindDateHelper {
  setUTCHoursToFindDateHelper(date: Date) {
    const START_HOUR = 0;
    const START_MINUTE = 0;
    const START_SECOND = 0;
    const START_MILLISECOND = 0;

    const END_HOUR = 23;
    const END_MINUTE = 59;
    const END_SECOND = 59;
    const END_MILLISECOND = 999;

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(
      START_HOUR,
      START_MINUTE,
      START_SECOND,
      START_MILLISECOND,
    );

    startOfDay.toISOString();

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(END_HOUR, END_MINUTE, END_SECOND, END_MILLISECOND);

    endOfDay.toISOString();

    return { startOfDay, endOfDay };
  }
}
