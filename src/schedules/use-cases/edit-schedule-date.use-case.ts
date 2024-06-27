import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';

@Injectable()
export class EditScheduleDateUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input) {
    return await this.schedulesRepository.create(input);
  }
}
