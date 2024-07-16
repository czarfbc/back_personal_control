import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class FindTransactionByDateAndBankInput {
  @IsNotEmpty()
  @IsDateString()
  @Field(() => String)
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  bankAccountId: number;
}
