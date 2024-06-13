import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { IUsersRepository } from '../repository/users.repository';
import { CryptoUtils } from 'src/utils/crypto.utils';

@Injectable()
export class CreateUserUseCase {
  @Inject('IUsersRepository')
  private usersRepository: IUsersRepository;

  @Inject()
  private cryptoUtils: CryptoUtils;

  async execute(input: CreateUserInput) {
    const [, encrypt] = await Promise.all([
      this.findUserEmail(input.email),
      this.encryptPassword(input.password),
    ]);

    const createUser = await this.usersRepository.create({
      ...input,
      password: encrypt.encryptedData,
      iv: encrypt.iv,
    });

    return createUser;
  }

  private async findUserEmail(email: string) {
    const findUserEmail = await this.usersRepository.findOneByEmail(email);
    if (findUserEmail) {
      throw new Error('Email already exists');
    }
  }

  private async encryptPassword(password: string) {
    const hash = await this.cryptoUtils.generate_hash(password);
    const encrypt = await this.cryptoUtils.encrypt(hash);

    return encrypt;
  }
}
