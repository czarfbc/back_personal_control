import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BankAccount } from './entities/bank-account.entity';
import { CreateBankAccountInput } from './dto/create-bank-account.input';
import { UpdateBankAccountInput } from './dto/update-bank-account.input';

@Resolver(() => BankAccount)
export class BankAccountsResolver {
  @Mutation(() => BankAccount)
  createBankAccount(
    @Args('createBankAccountInput')
    createBankAccountInput: CreateBankAccountInput,
  ) {
    return createBankAccountInput;
  }

  @Query(() => [BankAccount], { name: 'bankAccounts' })
  findAll() {
    return;
  }

  @Query(() => BankAccount, { name: 'bankAccount' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return id;
  }

  @Mutation(() => BankAccount)
  updateBankAccount(
    @Args('updateBankAccountInput')
    updateBankAccountInput: UpdateBankAccountInput,
  ) {
    return updateBankAccountInput;
  }

  @Mutation(() => BankAccount)
  removeBankAccount(@Args('id', { type: () => Int }) id: number) {
    return id;
  }
}
