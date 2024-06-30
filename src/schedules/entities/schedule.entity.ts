import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Schedule {
  @Field(() => String)
  scheduling: string;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
