import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput, ChangeStatusTodoListInput } from './dto';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { IContextReqUserTodoList } from './interfaces/index';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';

@Resolver(() => TodoList)
export class TodoListResolver {
  @Inject()
  private createTodoListUseCase: CreateTodoListUseCase;

  @Inject()
  private changeStatusTodoListUseCase: ChangeStatusTodoListUseCase;

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
}
