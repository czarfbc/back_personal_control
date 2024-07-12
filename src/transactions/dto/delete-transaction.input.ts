import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteTransactionInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  bankAccountId: number;
}
