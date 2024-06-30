import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { CreateScheduleInput } from './create-schedule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class EditScheduleInfoInput extends PartialType(CreateScheduleInput) {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
