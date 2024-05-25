import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  id: number;
}
