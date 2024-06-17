import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListResolver } from './todo-list.resolver';
import { TodoListRepository } from './repository/todo-list.repository';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';

@Module({
  providers: [
    TodoListResolver,
    TodoListService,
    CreateTodoListUseCase,
    TodoListRepository,
    {
      provide: 'ITodoListRepository',
      useExisting: TodoListRepository,
    },
  ],
})
export class TodoListModule {}
