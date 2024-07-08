import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionCategory } from './entities/transaction-category.entity';
import { CreateTransactionCategoryInput } from './dto/create-transaction-category.input';
import { UpdateTransactionCategoryInput } from './dto/update-transaction-category.input';

@Resolver(() => TransactionCategory)
export class TransactionCategoriesResolver {
  @Mutation(() => TransactionCategory)
  createTransactionCategory(
    @Args('createTransactionCategoryInput')
    createTransactionCategoryInput: CreateTransactionCategoryInput,
  ) {
    return createTransactionCategoryInput;
  }

  @Query(() => [TransactionCategory], { name: 'transactionCategories' })
  findAll() {
    return;
  }

  @Query(() => TransactionCategory, { name: 'transactionCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return id;
  }

  @Mutation(() => TransactionCategory)
  updateTransactionCategory(
    @Args('updateTransactionCategoryInput')
    updateTransactionCategoryInput: UpdateTransactionCategoryInput,
  ) {
    return updateTransactionCategoryInput;
  }

  @Mutation(() => TransactionCategory)
  removeTransactionCategory(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
