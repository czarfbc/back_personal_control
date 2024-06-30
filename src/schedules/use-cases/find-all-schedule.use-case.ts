import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { FindAllScheduleInput } from '../dto/find-all-schedule.input';

@Injectable()
export class FindAllScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input: FindAllScheduleInput) {
    return await this.schedulesRepository.findAll(input);
  }
}
