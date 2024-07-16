import { CreateTransactionCategoryInput } from './create-transaction-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionCategoryInput extends PartialType(CreateTransactionCategoryInput) {
  @Field(() => Int)
  id: number;
}
