import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repository/todo-list.repository';
import { ChangeStatusTodoListInput } from '../dto/change-status-todo-list.input';

@Injectable()
export class ChangeStatusTodoListUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: ChangeStatusTodoListInput) {
    return await this.todoListRepository.update(input);
  }
}
