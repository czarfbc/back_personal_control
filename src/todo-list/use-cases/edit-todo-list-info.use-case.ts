import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repositories/todo-list.repository';
import { EditTodoListInfoInput } from '../dto/edit-todo-list-info.input';

@Injectable()
export class EditTodoListInfoUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: EditTodoListInfoInput) {
    return await this.todoListRepository.update(input);
  }
}
