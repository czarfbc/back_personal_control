import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repositories/todo-list.repository';
import { EditTodoListInput } from '../dto/edit-todo-list.input';

@Injectable()
export class EditTodoListUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: EditTodoListInput) {
    return await this.todoListRepository.update(input);
  }
}
