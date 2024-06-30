import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  scheduling: string;

  @IsNotEmpty()
  @IsDateString()
  @Field(() => String)
  date: Date;

  userId: number;
}
