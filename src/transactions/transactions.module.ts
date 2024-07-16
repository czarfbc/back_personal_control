import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { FindTransactionByDateAndBankUseCase } from './use-cases/find-transaction-by-date-and-bank.use-case';
import { DeleteTransactionUseCase } from './use-cases/delete-transaction.use-case';
import { EditTransactionInfoUseCase } from './use-cases/edit-transaction-info.use-case';

@Module({
  providers: [
    TransactionsResolver,
    CreateTransactionUseCase,
    FindTransactionByDateAndBankUseCase,
    EditTransactionInfoUseCase,
    DeleteTransactionUseCase,
    TransactionRepository,
    {
      provide: 'ITransactionRepository',
      useExisting: TransactionRepository,
    },
  ],
})
export class TransactionsModule {}
