import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const findUserEmail = await this.prismaService.user.findUnique({
      where: {
        email: createUserInput.email,
      },
    });

    if (findUserEmail) {
      throw new Error('Email already exists');
    }

    const hash = await bcrypt.hash(createUserInput.password, 10);
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(hash, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(hash, 'utf-8'),
      cipher.final(),
    ]).toString('hex');

    const createUser = this.prismaService.user.create({
      data: { ...createUserInput, password: encryptedText },
    });

    return createUser;
  }

  async findOne(id: number): Promise<User> {
    const findOne = await this.prismaService.user.findUnique({
      where: { id },
    });

    return findOne;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const update = await this.prismaService.user.update({
      where: { id },
      data: updateUserInput.password,
    });

    return update;
  }

  async remove(id: number): Promise<User> {
    const remove = await this.prismaService.user.delete({
      where: { id },
    });

    return remove;
  }
}
