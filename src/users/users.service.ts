import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CryptoUtils } from 'src/utils/crypto.utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private cryptoUtils: CryptoUtils,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const findUserEmail = await this.prismaService.user.findUnique({
      where: {
        email: createUserInput.email,
      },
    });

    if (findUserEmail) {
      throw new Error('Email already exists');
    }

    const hash = await this.cryptoUtils.generate_hash(createUserInput.password);
    const encrypt = await this.cryptoUtils.encrypt(hash);

    const createUser = this.prismaService.user.create({
      data: {
        ...createUserInput,
        password: encrypt.encryptedData,
        iv: encrypt.iv,
      },
    });

    return createUser;
  }

  async findOneById(id: number): Promise<User> {
    const findOne = await this.prismaService.user.findUnique({
      where: { id },
    });

    return findOne;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findOne = await this.prismaService.user.findUnique({
      where: { email },
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
