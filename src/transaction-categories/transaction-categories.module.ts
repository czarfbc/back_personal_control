import { Module } from '@nestjs/common';
import { TransactionCategoriesResolver } from './transaction-categories.resolver';
import { TransactionCategoryRepository } from './repositories/transaction-category.repository';
import { CreateTransactionCategoryUseCase } from './use-cases/create-transaction-category.use-case';
import { DeleteTransactionCategoryUseCase } from './use-cases/delete-transaction-category.use-case';
import { FindAllTransactionCategoryUseCase } from './use-cases/find-all-transaction-category.use-case';

@Module({
  providers: [
    TransactionCategoriesResolver,
    CreateTransactionCategoryUseCase,
    DeleteTransactionCategoryUseCase,
    FindAllTransactionCategoryUseCase,
    TransactionCategoryRepository,
    {
      provide: 'ITransactionCategoryRepository',
      useExisting: TransactionCategoryRepository,
    },
  ],
})
export class TransactionCategoriesModule {}
