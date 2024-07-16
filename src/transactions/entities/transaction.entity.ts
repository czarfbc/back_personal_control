import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  bankAccountId: number;

  @Field(() => Int)
  transactionCategoryId: number;
}
