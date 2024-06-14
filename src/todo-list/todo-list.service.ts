import { Injectable } from '@nestjs/common';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';

@Injectable()
export class TodoListService {
  create(createTodoListInput: CreateTodoListInput) {
    return 'This action adds a new todoList';
  }

  findAll() {
    return `This action returns all todoList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoList`;
  }

  update(id: number, updateTodoListInput: UpdateTodoListInput) {
    return `This action updates a #${id} todoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoList`;
  }
}
