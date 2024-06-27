import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';

@Injectable()
export class CheckIfDateIsAvailable {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async dateIsAvailable(date: Date, userId: number) {
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
}
