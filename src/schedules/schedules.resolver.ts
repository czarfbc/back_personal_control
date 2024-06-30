import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { EditScheduleInfoInput } from './dto/edit-schedule-info.input';
import { Inject } from '@nestjs/common';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';
import { DeleteScheduleInput } from './dto/delete-schedule.input';
import { DeleteScheduleUseCase } from './use-cases/delete-schedule.use-case';
import { EditScheduleInfoUseCase } from './use-cases/edit-schedule-info.use-case';
import { FindAllScheduleUseCase } from './use-cases/find-all-schedule.use-case';
import { FindScheduleByDateScheduleUseCase } from './use-cases/find-schedule-by-date.use-case';
import { FindScheduleByDateInput } from './dto/find-schedule-by-date.input';

@Resolver(() => Schedule)
export class SchedulesResolver {
  @Inject()
  private createScheduleUseCase: CreateScheduleUseCase;

  @Inject()
  private deleteScheduleUseCase: DeleteScheduleUseCase;

  @Inject()
  private editScheduleInfoUseCase: EditScheduleInfoUseCase;

  @Inject()
  private findAllScheduleUseCase: FindAllScheduleUseCase;

  @Inject()
  private findScheduleByDateScheduleUseCase: FindScheduleByDateScheduleUseCase;

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

  @Query(() => [Schedule])
  findAllSchedules(@CurrentUser() userJwtInfo: IUserJWTInfo) {
    const userId = userJwtInfo.userId;
    return this.findAllScheduleUseCase.execute({ userId });
  }

  @Query(() => [Schedule])
  findSchedulesByDate(
    @Args('findScheduleByDateInput')
    findScheduleByDateInput: FindScheduleByDateInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.findScheduleByDateScheduleUseCase.execute({
      ...findScheduleByDateInput,
      userId: userJwtInfo.userId,
    });
  }

  @Mutation(() => Schedule)
  editScheduleInfo(
    @Args('updateScheduleInfoInput')
    editScheduleInfoInput: EditScheduleInfoInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.editScheduleInfoUseCase.execute({
      ...editScheduleInfoInput,
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
