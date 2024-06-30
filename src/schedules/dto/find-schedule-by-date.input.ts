import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class FindScheduleByDateInput {
  @IsNotEmpty()
  @IsDateString()
  @Field(() => String)
  date: Date;

  userId: number;
}
