import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TodoList } from './entities/todo-list.entity';
import {
  CreateTodoListInput,
  ChangeStatusTodoListInput,
  FindTodoListByStatusInput,
  DeleteTodoListInput,
} from './dto';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';
import { FindTodoListByStatusUseCase } from './use-cases/find-todo-list-by-status.use-case';
import { CurrentUser } from 'src/decorators';
import { IUserJWTInfo } from 'src/helpers/interfaces';
import { DeleteTodoListUseCase } from './use-cases/delete-todo-list.use-case';

@Resolver(() => TodoList)
export class TodoListResolver {
  @Inject()
  private createTodoListUseCase: CreateTodoListUseCase;

  @Inject()
  private changeStatusTodoListUseCase: ChangeStatusTodoListUseCase;

  @Inject()
  private findTodoListByStatusUseCase: FindTodoListByStatusUseCase;

  @Inject()
  private deleteTodoListUseCase: DeleteTodoListUseCase;

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

  @Mutation(() => Boolean)
  deleteTodoList(
    @Args('deleteTodoListInput') deleteTodoListInput: DeleteTodoListInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.deleteTodoListUseCase.execute({
      ...deleteTodoListInput,
      userId: userJwtInfo.userId,
    });
  }
}
