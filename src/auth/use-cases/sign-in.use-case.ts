import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../repositories/auth.repository';
import { SignInAuthInput } from '../dto/signin-auth.input';
import { GenerateTokenHelper } from '../helpers/generate-token.helper';
import { CryptoUtils } from 'src/utils/crypto.utils';
import { HashHelper } from '../helpers/hash.helper';

@Injectable()
export class SignInUseCase {
  @Inject('IAuthRepository')
  private authRepository: IAuthRepository;

  @Inject()
  private cryptoUtils: CryptoUtils;

  @Inject()
  private generateTokenUtils: GenerateTokenHelper;

  @Inject()
  private hashHelper: HashHelper;

  async execute(input: SignInAuthInput) {
    const findUserEmail = await this.findUserEmail(input.email);

    const [, tokens] = await Promise.all([
      this.decryptPassword(
        findUserEmail.password,
        findUserEmail.iv,
        input.password,
      ),
      this.generateTokenUtils.generateToken(
        findUserEmail.id,
        findUserEmail.name,
        findUserEmail.email,
      ),
    ]);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  private async findUserEmail(email: string) {
    const findUserEmail = await this.authRepository.findOneByEmail(email);
    if (!findUserEmail) {
      throw new Error('Invalid credentials');
    }

    return findUserEmail;
  }

  private async decryptPassword(
    encryptedPassword: string,
    iv: string,
    password: string,
  ) {
    const decipher = await this.cryptoUtils.decrypt(encryptedPassword, iv);

    const isMatch = await this.hashHelper.compare_hash(password, decipher);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  }
}
