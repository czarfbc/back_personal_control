import { Module } from '@nestjs/common';
import { SchedulesResolver } from './schedules.resolver';
import { SchedulesRepository } from './repositories/schedule.repository';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { DeleteScheduleUseCase } from './use-cases/delete-schedule.use-case';
import { EditScheduleInfoUseCase } from './use-cases/edit-schedule-info.use-case';
import { FindAllScheduleUseCase } from './use-cases/find-all-schedule.use-case';
import { FindScheduleByDateScheduleUseCase } from './use-cases/find-schedule-by-day.use-case';
import { EditScheduleDateUseCase } from './use-cases/edit-schedule-date.use-case';
import { BeforeDateScheduleHelper } from './helpers/before-date-schedule.helper';
import { CheckIfDateIsAvailable } from './helpers/check-if-date-is-available.helper';
import { RemoveSecondsOfDateHelper } from './helpers/remove-seconds-of-date.helper';

@Module({
  providers: [
    SchedulesResolver,
    BeforeDateScheduleHelper,
    RemoveSecondsOfDateHelper,
    CheckIfDateIsAvailable,
    CreateScheduleUseCase,
    DeleteScheduleUseCase,
    EditScheduleInfoUseCase,
    EditScheduleDateUseCase,
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
