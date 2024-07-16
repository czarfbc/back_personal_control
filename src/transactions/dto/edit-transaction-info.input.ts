import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { CreateTransactionInput } from './create-transaction.input';

@InputType()
export class EditTransactionInfoInput extends PartialType(
  CreateTransactionInput,
) {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  bankAccountId: number;
}
