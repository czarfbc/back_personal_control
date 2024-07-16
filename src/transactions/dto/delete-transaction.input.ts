import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class DeleteTransactionInput {
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
