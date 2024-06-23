import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repository/todo-list.repository';
import { FindTodoListByStatusInput } from '../dto';

@Injectable()
export class FindTodoListByStatusUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: FindTodoListByStatusInput) {
    return await this.todoListRepository.findByStatus(input);
  }
}
