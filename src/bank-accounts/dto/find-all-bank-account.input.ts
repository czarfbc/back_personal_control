import { InputType } from '@nestjs/graphql';

@InputType()
export class FindAllBankAccountInput {
  userId: number;
}
