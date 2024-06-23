import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TodoList } from './entities/todo-list.entity';
import {
  CreateTodoListInput,
  ChangeStatusTodoListInput,
  FindTodoListByStatusInput,
} from './dto';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';
import { FindTodoListByStatusUseCase } from './use-cases/find-todo-list-by-status.use-case';
import { CurrentUser } from 'src/decorators';
import { IUserJWTInfo } from 'src/helpers/interfaces';

@Resolver(() => TodoList)
export class TodoListResolver {
  @Inject()
  private createTodoListUseCase: CreateTodoListUseCase;

  @Inject()
  private changeStatusTodoListUseCase: ChangeStatusTodoListUseCase;

  @Inject()
  private findTodoListByStatusUseCase: FindTodoListByStatusUseCase;

  @Mutation(() => TodoList)
  createTodoList(
    @Args('createTodoListInput') createTodoListInput: CreateTodoListInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.createTodoListUseCase.execute({
      ...createTodoListInput,
      userId: userJwtInfo.userId,
    });
  }

  @Mutation(() => TodoList)
  changeStatusTodoList(
    @Args('changeStatusTodoList')
    changeStatusTodoListInput: ChangeStatusTodoListInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.changeStatusTodoListUseCase.execute({
      ...changeStatusTodoListInput,
      userId: userJwtInfo.userId,
    });
  }

  @Query(() => [TodoList])
  findTodoListByStatus(
    @Args('findTodoListByStatusInput')
    findTodoListByStatusInput: FindTodoListByStatusInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.findTodoListByStatusUseCase.execute({
      ...findTodoListByStatusInput,
      userId: userJwtInfo.userId,
    });
  }
}
