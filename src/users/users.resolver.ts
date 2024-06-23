import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/decorators';
import { Inject } from '@nestjs/common';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { WhoAmIUseCase } from './use-cases/who-am-i.use-case';
import { IUserJWTInfo } from 'src/interfaces/jwt-info.todo-list.interface';

@Resolver(() => User)
export class UsersResolver {
  @Inject()
  private readonly deleteUserUseCase: DeleteUserUseCase;

  @Inject()
  private readonly whoAmIUseCase: WhoAmIUseCase;

  @Query(() => User)
  whoAmI(@CurrentUser() userJwtInfo: IUserJWTInfo) {
    return this.whoAmIUseCase.execute(userJwtInfo.userId);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    this.deleteUserUseCase.execute(id);
  }
}
