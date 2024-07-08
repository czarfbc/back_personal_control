import { Module } from '@nestjs/common';
import { CategoryTransactionResolver } from './category-transaction.resolver';

@Module({
  providers: [CategoryTransactionResolver],
})
export class CategoryTransactionModule {}
