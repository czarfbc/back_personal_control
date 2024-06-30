import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repositories/todo-list.repository';
import { CreateTodoListInput } from '../dto/create-todo-list.input';

@Injectable()
export class CreateTodoListUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: CreateTodoListInput) {
    return await this.todoListRepository.create(input);
  }
}
