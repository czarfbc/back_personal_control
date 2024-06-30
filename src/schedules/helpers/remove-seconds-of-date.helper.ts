import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveSecondsOfDateHelper {
  removeSeconds(date: Date): Date {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);

    return newDate;
  }
}
