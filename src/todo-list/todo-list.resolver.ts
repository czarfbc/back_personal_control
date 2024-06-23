import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { TodoList } from './entities/todo-list.entity';
import {
  CreateTodoListInput,
  ChangeStatusTodoListInput,
  FindTodoListByStatusInput,
} from './dto';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { IContextReqUserTodoList } from './interfaces/index';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';
import { FindTodoListByStatusUseCase } from './use-cases/find-todo-list-by-status.use-case';

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
    @Context() context: IContextReqUserTodoList,
  ) {
    const userJWT = context.req.user;

    return this.createTodoListUseCase.execute({
      ...createTodoListInput,
      userId: userJWT.userId,
    });
  }

  @Mutation(() => TodoList)
  changeStatusTodoList(
    @Args('changeStatusTodoList')
    changeStatusTodoListInput: ChangeStatusTodoListInput,
    @Context() context: IContextReqUserTodoList,
  ) {
    const userJWT = context.req.user;

    return this.changeStatusTodoListUseCase.execute({
      ...changeStatusTodoListInput,
      userId: userJWT.userId,
    });
  }

  @Query(() => [TodoList])
  findTodoListByStatus(
    @Args('findTodoListByStatusInput')
    findTodoListByStatusInput: FindTodoListByStatusInput,
    @Context() context: IContextReqUserTodoList,
  ) {
    const userJWT = context.req.user;

    return this.findTodoListByStatusUseCase.execute({
      ...findTodoListByStatusInput,
      userId: userJWT.userId,
    });
  }
}
