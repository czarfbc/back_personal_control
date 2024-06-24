import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class EditTodoListInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  todo: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
