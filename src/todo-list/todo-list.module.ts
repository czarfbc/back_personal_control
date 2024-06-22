import { Module } from '@nestjs/common';
import { TodoListResolver } from './todo-list.resolver';
import { TodoListRepository } from './repository/todo-list.repository';
import { CreateTodoListUseCase } from './use-cases/create-todo-list.use-case';
import { ChangeStatusTodoListUseCase } from './use-cases/change-status-todo-list.use-case';

@Module({
  providers: [
    TodoListResolver,
    CreateTodoListUseCase,
    ChangeStatusTodoListUseCase,
    TodoListRepository,
    {
      provide: 'ITodoListRepository',
      useExisting: TodoListRepository,
    },
  ],
})
export class TodoListModule {}
