import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { CreateTodoListInput } from './create-todo-list.input';

@InputType()
export class EditTodoListInfoInput extends PartialType(CreateTodoListInput) {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  userId: number;
}
