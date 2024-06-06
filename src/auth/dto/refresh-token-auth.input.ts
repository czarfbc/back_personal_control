import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RefreshTokenAuthInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  refresh_token: string;
}
