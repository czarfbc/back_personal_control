import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface IUsersRepository {
  findOneById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async findOneById(id: number): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
