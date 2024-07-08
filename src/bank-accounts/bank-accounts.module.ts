import { Module } from '@nestjs/common';
import { BankAccountsResolver } from './bank-accounts.resolver';

@Module({
  providers: [BankAccountsResolver],
})
export class BankAccountsModule {}
