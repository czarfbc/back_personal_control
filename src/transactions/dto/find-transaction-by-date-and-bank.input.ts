import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindTransactionByDateAndBankInput {
  @Field(() => String)
  date: Date;

  @Field(() => Int)
  bankAccountId: number;
}
