import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Resolver(() => Schedule)
export class SchedulesResolver {
  @Mutation(() => Schedule)
  createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ) {
    return createScheduleInput;
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
