import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../repository/users.repository';

@Injectable()
export class WhoAmIUseCase {
  @Inject('IUsersRepository')
  private usersRepository: IUsersRepository;

  async execute(id: number) {
    return await this.usersRepository.findOneById(id);
  }
}
