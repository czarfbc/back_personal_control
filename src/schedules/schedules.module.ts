import { Module } from '@nestjs/common';
import { SchedulesResolver } from './schedules.resolver';
import { SchedulesRepository } from './repositories/schedule.repository';

@Module({
  providers: [
    SchedulesResolver,
    SchedulesRepository,
    {
      provide: 'ISchedulesRepository',
      useExisting: SchedulesRepository,
    },
  ],
})
export class SchedulesModule {}
