import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { FindScheduleByDateInput } from '../dto/find-schedule-by-date.input';

@Injectable()
export class FindScheduleByDateScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input: FindScheduleByDateInput) {
    return await this.schedulesRepository.findByDate(input);
  }
}
