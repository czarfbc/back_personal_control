import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateTodoListInput } from './create-todo-list.input';

export class CreateTodoListWithUserIdDto extends CreateTodoListInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userId: number;
}
