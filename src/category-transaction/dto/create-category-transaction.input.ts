import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryTransactionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
