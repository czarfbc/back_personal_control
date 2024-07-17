import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionCategory } from './entities/transaction-category.entity';
import { CreateTransactionCategoryInput } from './dto/create-transaction-category.input';
import { Inject } from '@nestjs/common';
import { CreateTransactionCategoryUseCase } from './use-cases/create-transaction-category.use-case';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';
import { DeleteTransactionCategoryUseCase } from './use-cases/delete-transaction-category.use-case';
import { DeleteTransactionCategoryInput } from './dto/delete-transaction-category.input';
import { FindAllTransactionCategoryUseCase } from './use-cases/find-all-transaction-category.use-case';

@Resolver(() => TransactionCategory)
export class TransactionCategoriesResolver {
  @Inject()
  private createTransactionCategoryUseCase: CreateTransactionCategoryUseCase;

  @Inject()
  private deleteTransactionCategoryUseCase: DeleteTransactionCategoryUseCase;

  @Inject()
  private findAllTransactionCategoryUseCase: FindAllTransactionCategoryUseCase;

  @Mutation(() => TransactionCategory)
  createTransactionCategory(
    @Args('createTransactionCategoryInput')
    createTransactionCategoryInput: CreateTransactionCategoryInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.createTransactionCategoryUseCase.execute({
      ...createTransactionCategoryInput,
      userId: userJwtInfo.userId,
    });
  }

  @Query(() => [TransactionCategory])
  findAllTransactionCategory(@CurrentUser() userJwtInfo: IUserJWTInfo) {
    const userId = userJwtInfo.userId;

    return this.findAllTransactionCategoryUseCase.execute({ userId });
  }

  @Mutation(() => Boolean)
  deleteTransactionCategory(
    @Args('deleteTransactionCategoryInput')
    deleteTransactionCategoryInput: DeleteTransactionCategoryInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.deleteTransactionCategoryUseCase.execute({
      ...deleteTransactionCategoryInput,
      userId: userJwtInfo.userId,
    });
  }
}
