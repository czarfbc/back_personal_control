import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { ChangeStatusTodoListInput } from './dto/change-status-todo-list.input';
import { FindTodoListByStatusInput } from './dto/find-todo-list-by-status.input';
import { DeleteTodoListInput } from './dto/delete-todo-list.input';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';
import { FindTodoListByStatusUseCase } from './use-cases/find-todo-list-by-status.use-case';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IUserJWTInfo } from 'src/utils/interfaces/jwt-user-info.interface';
import { DeleteTodoListUseCase } from './use-cases/delete-todo-list.use-case';
import { EditTodoListUseCase } from './use-cases/edit-todo-list.use-case';
import { EditTodoListInput } from './dto/edit-todo-list.input';

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

  @Inject() editTodoListUseCase: EditTodoListUseCase;

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

  @Mutation(() => TodoList)
  editTodoList(
    @Args('editTodoListInput') editTodoListInput: EditTodoListInput,
    @CurrentUser() userJwtInfo: IUserJWTInfo,
  ) {
    return this.editTodoListUseCase.execute({
      ...editTodoListInput,
      userId: userJwtInfo.userId,
    });
  }
}
