import { Inject, Injectable } from '@nestjs/common';
import { ISchedulesRepository } from '../repositories/schedule.repository';
import { DeleteScheduleInput } from '../dto/delete-schedule.input';

@Injectable()
export class DeleteScheduleUseCase {
  @Inject('ISchedulesRepository')
  private schedulesRepository: ISchedulesRepository;

  async execute(input: DeleteScheduleInput) {
    await this.verifyExistence(input.id);

    await this.schedulesRepository.create(input);

    return true;
  }

  async verifyExistence(id: number) {
    const verified = await this.schedulesRepository.findById({ id });

    if (!verified) {
      throw new Error('Schedule not found');
    }
  }
}
