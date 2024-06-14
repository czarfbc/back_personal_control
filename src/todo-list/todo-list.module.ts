import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListResolver } from './todo-list.resolver';

@Module({
  providers: [TodoListResolver, TodoListService],
})
export class TodoListModule {}
