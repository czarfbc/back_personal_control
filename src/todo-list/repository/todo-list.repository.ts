import { Inject, Injectable } from '@nestjs/common';
import { TodoList } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface ITodoListRepository {
  create(todo: Partial<TodoList>): Promise<TodoList>;
  // delete(id: number): Promise<void>;
  update(todo: Partial<TodoList>): Promise<TodoList>;
  // findByStatus(status: string): Promise<TodoList[]>;
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

  // async delete(id: number): Promise<void> {}

  async update(todo: TodoList): Promise<TodoList> {
    return await this.prismaService.todoList.update({
      where: { id: todo.id },
      data: todo,
    });
  }

  // async findByStatus(status: string): Promise<TodoList[]> {}
}
