import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

enum TodoStatus {
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@InputType()
export class FindTodoListByStatusInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  status: TodoStatus;

  userId: number;
}
