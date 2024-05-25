import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthInput, SignInAuthInput } from './dto';
import { IPayloadAuth } from './interfaces';
import { CryptoUtils } from 'src/utils/crypto.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoUtils: CryptoUtils,
  ) {}

  async signUp(signUpAuthInput: SignUpAuthInput): Promise<SignUpAuthInput> {
    const findUserEmail = await this.usersService.findOneByEmail(
      signUpAuthInput.email,
    );

    if (findUserEmail) {
      throw new Error('Email already exists');
    }

    const createUser = await this.usersService.create(signUpAuthInput);

    return createUser;
  }

  async signIn(signInAuthInput: SignInAuthInput): Promise<{
    email: string;
    name: string;
    id: number;
    access_token: string;
    refresh_token: string;
  }> {
    const findUserEmail = await this.usersService.findOneByEmail(
      signInAuthInput.email,
    );
    if (!findUserEmail) {
      throw new Error('Invalid credentials');
    }

    const decipher = await this.cryptoUtils.decrypt(
      findUserEmail.password,
      findUserEmail.iv,
    );
    const isMatch = await this.cryptoUtils.compare_hash(
      signInAuthInput.password,
      decipher,
    );
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload: IPayloadAuth = {
      sub: findUserEmail.id,
      email: findUserEmail.email,
      name: findUserEmail.name,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      id: findUserEmail.id,
      name: findUserEmail.name,
      email: findUserEmail.email,
      access_token,
      refresh_token,
    };
  }
}
