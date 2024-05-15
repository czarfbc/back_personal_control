import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    email: string;
    name: string;
    id: number;
    access_token: string;
  }> {
    const findUserEmail = await this.usersService.findOneByEmail(email);
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

    const isMatch = await bcrypt.compare(password, decryptedText);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: findUserEmail.id,
      username: findUserEmail.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      email: findUserEmail.email,
      name: findUserEmail.name,
      id: findUserEmail.id,
      access_token,
    };
  }
}
