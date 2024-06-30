import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInfoInput } from './dto/edit-schedule-info.input';
import { Inject } from '@nestjs/common';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';
import { DeleteScheduleInput } from './dto/delete-schedule.input';
import { DeleteScheduleUseCase } from './use-cases/delete-schedule.use-case';
import { EditScheduleInfoUseCase } from './use-cases/edit-schedule-info.use-case';

@Resolver(() => Schedule)
export class SchedulesResolver {
  @Inject()
  private createScheduleUseCase: CreateScheduleUseCase;

  @Inject()
  private deleteScheduleUseCase: DeleteScheduleUseCase;

  @Inject()
  private editScheduleInfoUseCase: EditScheduleInfoUseCase;

  @Mutation(() => Schedule)
  createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.createScheduleUseCase.execute({
      ...createScheduleInput,
      userId: userJwtInfo.userId,
    });
  }

  @Query(() => [Schedule], { name: 'schedules' })
  findAll() {
    return;
  }

  @Mutation(() => Schedule)
  editScheduleInfo(
    @Args('updateScheduleInfoInput')
    updateScheduleInfoInput: UpdateScheduleInfoInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.editScheduleInfoUseCase.execute({
      ...updateScheduleInfoInput,
      userId: userJwtInfo.userId,
    });
  }

  @Mutation(() => Boolean)
  deleteSchedule(
    @Args('deleteScheduleInput') deleteScheduleInput: DeleteScheduleInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.deleteScheduleUseCase.execute({
      ...deleteScheduleInput,
      userId: userJwtInfo.userId,
    });
  }
}
