import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionCategory {
  @Field(() => String)
  category: string;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
