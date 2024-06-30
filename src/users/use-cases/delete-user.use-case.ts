import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class DeleteUserUseCase {
  @Inject('IUsersRepository')
  private usersRepository: IUsersRepository;

  async execute(id: number) {
    await this.usersRepository.delete(id);
  }
}
