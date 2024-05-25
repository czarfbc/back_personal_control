import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpAuthInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString({})
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String)
  name: string;
}
