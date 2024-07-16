import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionTypes } from '../helpers/transaction-types.enum';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @Field(() => String, { nullable: true })
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @Field(() => String)
  date: Date;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @Field(() => Float)
  amount: Decimal;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @Field(() => String, { nullable: true })
  observation: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  type: TransactionTypes;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  bankAccountId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  transactionCategoryId: number;
}
