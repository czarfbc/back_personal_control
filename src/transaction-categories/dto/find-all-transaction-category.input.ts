import { InputType } from '@nestjs/graphql';

@InputType()
export class FindAllTransactionCategoryInput {
  userId: number;
}
