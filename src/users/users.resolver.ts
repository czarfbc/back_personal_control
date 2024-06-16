import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/decorators';
import { Inject } from '@nestjs/common';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { WhoAmIUseCase } from './use-cases/who-am-i.use-case';

@Resolver(() => User)
export class UsersResolver {
  @Inject()
  private readonly deleteUserUseCase: DeleteUserUseCase;

  @Inject()
  private readonly whoAmIUseCase: WhoAmIUseCase;

  @Query(() => User)
  whoAmI(@CurrentUser() user: Partial<User> & { userId: number }) {
    return this.whoAmIUseCase.execute(user.userId);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    this.deleteUserUseCase.execute(id);
  }
}
