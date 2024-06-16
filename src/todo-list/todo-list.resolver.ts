import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoListService } from './todo-list.service';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';

@Resolver(() => TodoList)
export class TodoListResolver {
  constructor(private readonly todoListService: TodoListService) {}

  @Mutation(() => TodoList)
  createTodoList(
    @Args('createTodoListInput') createTodoListInput: CreateTodoListInput,
  ) {
    return this.todoListService.create(createTodoListInput);
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
