import { Inject, Injectable } from '@nestjs/common';
import { TodoList } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface ITodoListRepository {
  create(todo: Partial<TodoList>): Promise<TodoList>;
}

@Injectable()
export class TodoListRepository implements ITodoListRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(todo: TodoList): Promise<TodoList> {
    return await this.prismaService.todoList.create({
      data: todo,
    });
  }
}
