import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../repository/users.repository';

@Injectable()
export class DeleteUserUseCase {
  @Inject('IUsersRepository')
  private usersRepository: IUsersRepository;

  async execute(id: number) {
    await this.usersRepository.delete(id);
  }
}
