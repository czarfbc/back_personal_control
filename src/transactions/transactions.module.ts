import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';

@Module({
  providers: [
    TransactionsResolver,
    CreateTransactionUseCase,
    TransactionRepository,
    {
      provide: 'ITransactionRepository',
      useExisting: TransactionRepository,
    },
  ],
})
export class TransactionsModule {}
