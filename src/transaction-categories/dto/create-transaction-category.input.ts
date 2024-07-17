import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTransactionCategoryInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  category: string;

  userId: number;
}
