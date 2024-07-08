import { Module } from '@nestjs/common';
import { BankAccountsResolver } from './bank-accounts.resolver';
import { BankAccountRepository } from './repositories/bank-accounts.repository';
import { CreateBankAccountUseCase } from './use-cases/create-bank-account.use-case';
import { FindAllBankAccountUseCase } from './use-cases/find-all-bank-account.use-case';
import { DeleteBankAccountUseCase } from './use-cases/delete-bank-account.use-case';

@Module({
  providers: [
    BankAccountsResolver,
    CreateBankAccountUseCase,
    FindAllBankAccountUseCase,
    DeleteBankAccountUseCase,
    BankAccountRepository,
    {
      provide: 'IBankAccountRepository',
      useExisting: BankAccountRepository,
    },
  ],
})
export class BankAccountsModule {}
