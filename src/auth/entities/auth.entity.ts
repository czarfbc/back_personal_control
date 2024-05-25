import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}
