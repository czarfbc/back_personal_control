import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryTransaction } from './entities/category-transaction.entity';
import { CreateCategoryTransactionInput } from './dto/create-category-transaction.input';
import { UpdateCategoryTransactionInput } from './dto/update-category-transaction.input';

@Resolver(() => CategoryTransaction)
export class CategoryTransactionResolver {
  @Mutation(() => CategoryTransaction)
  createCategoryTransaction(
    @Args('createCategoryTransactionInput')
    createCategoryTransactionInput: CreateCategoryTransactionInput,
  ) {
    return createCategoryTransactionInput;
  }

  @Query(() => [CategoryTransaction], { name: 'categoryTransaction' })
  findAll() {
    return;
  }

  @Query(() => CategoryTransaction, { name: 'categoryTransaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return id;
  }

  @Mutation(() => CategoryTransaction)
  updateCategoryTransaction(
    @Args('updateCategoryTransactionInput')
    updateCategoryTransactionInput: UpdateCategoryTransactionInput,
  ) {
    return updateCategoryTransactionInput;
  }

  @Mutation(() => CategoryTransaction)
  removeCategoryTransaction(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
