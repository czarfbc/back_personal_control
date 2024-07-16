import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { Inject } from '@nestjs/common';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { FindTransactionByDateAndBankUseCase } from './use-cases/find-transaction-by-date-and-bank.use-case';
import { FindTransactionByDateAndBankInput } from './dto/find-transaction-by-date-and-bank.input';
import { DeleteTransactionUseCase } from './use-cases/delete-transaction.use-case';
import { DeleteTransactionInput } from './dto/delete-transaction.input';
import { EditTransactionInfoUseCase } from './use-cases/edit-transaction-info.use-case';
import { EditTransactionInfoInput } from './dto/edit-transaction-info.input';

@Resolver(() => Transaction)
export class TransactionsResolver {
  @Inject()
  private createTransactionUseCase: CreateTransactionUseCase;

  @Inject()
  private findTransactionByDateAndBankUseCase: FindTransactionByDateAndBankUseCase;

  @Inject()
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  @Inject()
  private editTransactionInfoUseCase: EditTransactionInfoUseCase;

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

  @Mutation(() => Boolean)
  deleteTransaction(
    @Args('deleteTransactionInput')
    deleteTransactionInput: DeleteTransactionInput,
  ) {
    return this.deleteTransactionUseCase.execute(deleteTransactionInput);
  }

  @Mutation(() => Transaction)
  editTransactionInfo(
    @Args('editTransactionInfoInput')
    editTransactionInfoInput: EditTransactionInfoInput,
  ) {
    return this.editTransactionInfoUseCase.execute(editTransactionInfoInput);
  }
}
