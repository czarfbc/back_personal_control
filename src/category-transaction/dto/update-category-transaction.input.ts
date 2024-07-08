import { CreateCategoryTransactionInput } from './create-category-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryTransactionInput extends PartialType(CreateCategoryTransactionInput) {
  @Field(() => Int)
  id: number;
}
