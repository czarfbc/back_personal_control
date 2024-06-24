import { Module } from '@nestjs/common';
import { SchedulesResolver } from './schedules.resolver';

@Module({
  providers: [SchedulesResolver],
})
export class SchedulesModule {}
