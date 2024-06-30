import { Module } from '@nestjs/common';
import { SchedulesResolver } from './schedules.resolver';
import { SchedulesRepository } from './repositories/schedule.repository';
import { CreateScheduleUseCase } from './use-cases/create-schedule.use-case';
import { DeleteScheduleUseCase } from './use-cases/delete-schedule.use-case';
import { FindAllScheduleUseCase } from './use-cases/find-all-schedule.use-case';
import { FindScheduleByDateScheduleUseCase } from './use-cases/find-schedule-by-date.use-case';
import { EditScheduleInfoUseCase } from './use-cases/edit-schedule-info.use-case';
import { BeforeDateScheduleHelper } from './helpers/before-date-schedule.helper';
import { CheckIfDateIsAvailable } from './helpers/check-if-date-is-available.helper';
import { RemoveSecondsOfDateHelper } from './helpers/remove-seconds-of-date.helper';
import { SanitizeAndCheckDate } from './helpers/sanitize-and-check-date.helper';
import { SetUTCHoursToFindDateHelper } from './helpers/set-utc-hours-to-find-date.helper';

@Module({
  providers: [
    SchedulesResolver,
    BeforeDateScheduleHelper,
    SetUTCHoursToFindDateHelper,
    RemoveSecondsOfDateHelper,
    CheckIfDateIsAvailable,
    CreateScheduleUseCase,
    DeleteScheduleUseCase,
    SanitizeAndCheckDate,
    EditScheduleInfoUseCase,
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
