import { Inject, Injectable } from '@nestjs/common';
import { SignUpAuthInput } from '../dto';
import { IAuthRepository } from '../repository/auth.repository';
import { CryptoUtils } from 'src/utils/crypto.utils';

@Injectable()
export class SignUpUseCase {
  @Inject('IAuthRepository')
  private authRepository: IAuthRepository;

  @Inject()
  private cryptoUtils: CryptoUtils;

  async execute(input: SignUpAuthInput) {
    const [, encrypt] = await Promise.all([
      this.findUserEmail(input.email),
      this.encryptPassword(input.password),
    ]);

    const createUser = await this.authRepository.signUp({
      ...input,
      password: encrypt.encryptedData,
      iv: encrypt.iv,
    });

    return createUser;
  }

  private async findUserEmail(email: string) {
    const findUserEmail = await this.authRepository.findOneByEmail(email);
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
