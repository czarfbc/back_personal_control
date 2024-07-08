import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBankAccountInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
