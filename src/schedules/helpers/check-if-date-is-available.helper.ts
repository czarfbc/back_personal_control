import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';

@Injectable()
export class CheckIfDateIsAvailable {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async dateIsAvailable(date: Date, userId: number) {
    const dateExists = await this.schedulesRepository.findFirst({
      date,
      userId,
    });

    console.log(dateExists);

    if (dateExists) {
      throw new Error('Date already exists');
    }

    return;
  }
}
