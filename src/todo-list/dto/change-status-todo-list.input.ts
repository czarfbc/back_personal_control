import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

enum TodoStatus {
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

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
