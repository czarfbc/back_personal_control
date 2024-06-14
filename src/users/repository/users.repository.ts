import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface IUsersRepository {
  create(user: Partial<User>): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: number): Promise<User>;
  updatePassword(id: number, password: string): Promise<void>;
  delete(id: number): Promise<void>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async create(user: User): Promise<User> {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async updatePassword(id: number, password: string): Promise<void> {
    await this.prismaService.user.update({
      where: { id },
      data: password,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
