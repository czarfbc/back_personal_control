import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/edit-schedule.input';
import { Inject } from '@nestjs/common';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';

@Resolver(() => Schedule)
export class SchedulesResolver {
  @Inject()
  private createScheduleUseCase: CreateScheduleUseCase;

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

  @Query(() => Schedule, { name: 'schedule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return id;
  }

  @Mutation(() => Schedule)
  updateSchedule(
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
  ) {
    return updateScheduleInput;
  }

  @Mutation(() => Schedule)
  removeSchedule(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
