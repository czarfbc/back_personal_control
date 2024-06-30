import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { TodoStatus } from '../helpers/todo-list-status.enum';

@InputType()
export class ChangeStatusTodoListInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  status: TodoStatus;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
