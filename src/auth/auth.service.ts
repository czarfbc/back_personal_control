import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUpAuthInput, SignInAuthInput } from './dto';
import { IPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

    const decryptPass = process.env.DECRYPT_KEY;

    const iv = Buffer.from(findUserEmail.iv, 'hex');
    const key = (await promisify(scrypt)(decryptPass, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(findUserEmail.password, 'hex')),
      decipher.final(),
    ]).toString();

    const isMatch = await bcrypt.compare(
      signInAuthInput.password,
      decryptedText,
    );
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload: IPayload = {
      sub: findUserEmail.id,
      email: findUserEmail.email,
      name: findUserEmail.name,
    };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      id: findUserEmail.id,
      name: findUserEmail.name,
      email: findUserEmail.email,
      access_token,
      refresh_token,
    };
  }
}
