import { Module } from '@nestjs/common';
import { TransactionCategoriesResolver } from './transaction-categories.resolver';

@Module({
  providers: [TransactionCategoriesResolver],
})
export class TransactionCategoriesModule {}
