import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TodoListService } from './todo-list.service';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';
import { Inject } from '@nestjs/common';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { CreateTodoListWithUserIdDto } from './dto/create-todo-list-with-user-id.dto';
import { IContextReqUserTodoList } from './interfaces/index';

@Resolver(() => TodoList)
export class TodoListResolver {
  @Inject()
  private createTodoListUseCase: CreateTodoListUseCase;

  constructor(private readonly todoListService: TodoListService) {}

  @Mutation(() => TodoList)
  createTodoList(
    @Args('createTodoListInput') createTodoListInput: CreateTodoListInput,
    @Context() context: IContextReqUserTodoList,
  ) {
    const userId = context.req.user.userId;

    const input: CreateTodoListWithUserIdDto = {
      ...createTodoListInput,
      userId,
    };

    return this.createTodoListUseCase.execute(input);
  }

  @Query(() => [TodoList], { name: 'todoList' })
  findAll() {
    return this.todoListService.findAll();
  }

  @Query(() => TodoList, { name: 'todoList' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoListService.findOne(id);
  }

  @Mutation(() => TodoList)
  updateTodoList(
    @Args('updateTodoListInput') updateTodoListInput: UpdateTodoListInput,
  ) {
    return this.todoListService.update(
      updateTodoListInput.id,
      updateTodoListInput,
    );
  }

  @Mutation(() => TodoList)
  removeTodoList(@Args('id', { type: () => Int }) id: number) {
    return this.todoListService.remove(id);
  }
}
