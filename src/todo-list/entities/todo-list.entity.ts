import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TodoList {
  @Field(() => String)
  todo: string;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
