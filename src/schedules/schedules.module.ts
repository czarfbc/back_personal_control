import { Module } from '@nestjs/common';
import { SchedulesResolver } from './schedules.resolver';
import { SchedulesRepository } from './repositories/schedule.repository';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { DeleteScheduleUseCase } from './use-cases/delete-schedule.use-case';
import { EditInfoScheduleUseCase } from './use-cases/edit-info-schedule.use-case';
import { FindAllScheduleUseCase } from './use-cases/find-all-schedule.use-case';
import { FindScheduleByDateScheduleUseCase } from './use-cases/find-schedule-by-day.use-case';

@Module({
  providers: [
    SchedulesResolver,
    CreateScheduleUseCase,
    DeleteScheduleUseCase,
    EditInfoScheduleUseCase,
    FindAllScheduleUseCase,
    FindScheduleByDateScheduleUseCase,
    SchedulesRepository,
    {
      provide: 'ISchedulesRepository',
      useExisting: SchedulesRepository,
    },
  ],
})
export class SchedulesModule {}
