import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { Inject } from '@nestjs/common';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { FindTransactionByDateAndBankUseCase } from './use-cases/find-transaction-by-date-and-bank.use-case';
import { FindTransactionByDateAndBankInput } from './dto/find-transaction-by-date-and-bank.input';

@Resolver(() => Transaction)
export class TransactionsResolver {
  @Inject()
  private createTransactionUseCase: CreateTransactionUseCase;

  @Inject()
  private findTransactionByDateAndBankUseCase: FindTransactionByDateAndBankUseCase;

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.createTransactionUseCase.execute(createTransactionInput);
  }

  @Query(() => [Transaction])
  findTransactionByDateAndBank(
    @Args('findTransactionByDateAndBankInput')
    findTransactionByDateAndBankInput: FindTransactionByDateAndBankInput,
  ) {
    return this.findTransactionByDateAndBankUseCase.execute(
      findTransactionByDateAndBankInput,
    );
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
