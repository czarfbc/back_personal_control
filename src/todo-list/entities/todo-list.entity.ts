import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TodoList {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
