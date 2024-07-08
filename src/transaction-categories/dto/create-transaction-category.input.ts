import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
