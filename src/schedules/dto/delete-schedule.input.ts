import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class DeleteScheduleInput {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
