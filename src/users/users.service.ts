import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
