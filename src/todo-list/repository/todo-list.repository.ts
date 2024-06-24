import { Inject, Injectable } from '@nestjs/common';
import { TodoList } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface ITodoListRepository {
  create(todo: Partial<TodoList>): Promise<TodoList>;
  delete(todo: Partial<TodoList>): Promise<void>;
  update(todo: Partial<TodoList>): Promise<TodoList>;
  findByStatus(todo: Partial<TodoList>): Promise<TodoList[]>;
  findById(todo: Partial<TodoList>): Promise<TodoList>;
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

  async delete(todo: TodoList): Promise<void> {
    await this.prismaService.todoList.delete({
      where: { id: todo.id, userId: todo.userId },
    });

    return;
  }

  async update(todo: TodoList): Promise<TodoList> {
    return await this.prismaService.todoList.update({
      where: { id: todo.id, userId: todo.userId },
      data: todo,
    });
  }

  async findByStatus(todo: TodoList): Promise<TodoList[]> {
    return await this.prismaService.todoList.findMany({
      where: {
        userId: todo.userId,
        status: todo.status,
      },
    });
  }

  async findById(todo: TodoList): Promise<TodoList> {
    return await this.prismaService.todoList.findUnique({
      where: { id: todo.id, userId: todo.userId },
    });
  }
}
