import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoryTransaction {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
