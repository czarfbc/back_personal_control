import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TodoStatus } from '../helpers/todo-list-status.enum';

@InputType()
export class FindTodoListByStatusInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  status: TodoStatus;

  userId: number;
}
