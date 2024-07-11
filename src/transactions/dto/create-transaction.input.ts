import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionTypes } from '../helpers/transaction-types.enum';

@InputType()
export class CreateTransactionInput {
  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  date: Date;

  @Field(() => Float)
  amount: Decimal;

  @Field(() => String, { nullable: true })
  observation: string;

  @Field(() => String)
  type: TransactionTypes;

  @Field(() => Int)
  bankAccountId: number;

  @Field(() => Int)
  transactionCategoryId: number;
}
