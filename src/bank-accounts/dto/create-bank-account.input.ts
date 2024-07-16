import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateBankAccountInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String)
  name: string;

  userId: number;
}
