import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BankAccount } from './entities/bank-account.entity';
import { CreateBankAccountInput } from './dto/create-bank-account.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Inject } from '@nestjs/common';
import { CreateBankAccountUseCase } from './use-cases/create-bank-account.use-case';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';
import { FindAllBankAccountUseCase } from './use-cases/find-all-bank-account.use-case';
import { DeleteBankAccountInput } from './dto/delete-bank-account.input';
import { DeleteBankAccountUseCase } from './use-cases/delete-bank-account.use-case';

@Resolver(() => BankAccount)
export class BankAccountsResolver {
  @Inject()
  private createBankAccountUseCase: CreateBankAccountUseCase;

  @Inject()
  private findAllBankAccountUseCase: FindAllBankAccountUseCase;

  @Inject()
  private deleteBankAccountUseCase: DeleteBankAccountUseCase;

  @Mutation(() => BankAccount)
  createBankAccount(
    @Args('createBankAccountInput')
    createBankAccountInput: CreateBankAccountInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.createBankAccountUseCase.execute({
      ...createBankAccountInput,
      userId: userJwtInfo.userId,
    });
  }

  @Query(() => [BankAccount])
  findAllBankAccount(@CurrentUser() userJwtInfo: IUserJWTInfo) {
    const userId = userJwtInfo.userId;

    return this.findAllBankAccountUseCase.execute({ userId });
  }

  @Mutation(() => Boolean)
  deleteBankAccount(
    @Args('deleteBankAccountInput')
    deleteBankAccountInput: DeleteBankAccountInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.deleteBankAccountUseCase.execute({
      ...deleteBankAccountInput,
      userId: userJwtInfo.userId,
    });
  }
}
