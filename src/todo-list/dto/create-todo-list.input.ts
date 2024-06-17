import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoListInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  todo: string;
}
