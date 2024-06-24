import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../repository/todo-list.repository';
import { DeleteTodoListInput } from '../dto/delete-todo-list.input';

@Injectable()
export class DeleteTodoListUseCase {
  @Inject('ITodoListRepository')
  private todoListRepository: ITodoListRepository;

  async execute(input: DeleteTodoListInput) {
    await this.verifyExistence(input.id);

    await this.todoListRepository.delete(input);

    return true;
  }

  async verifyExistence(id: number) {
    const verified = await this.todoListRepository.findById({ id });

    if (!verified) {
      throw new Error('Todo list not found');
    }
  }
}
