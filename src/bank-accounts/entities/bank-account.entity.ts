import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BankAccount {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
