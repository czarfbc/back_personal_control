import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BankAccount {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
