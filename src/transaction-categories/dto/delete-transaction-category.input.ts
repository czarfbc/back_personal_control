import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class DeleteTransactionCategoryInput {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
