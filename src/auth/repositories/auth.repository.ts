import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface IAuthRepository {
  signUp(user: Partial<User>): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: number): Promise<User>;
}

@Injectable()
export class AuthRepository implements IAuthRepository {
  @Inject()
  private readonly prismaService: PrismaService;

  async signUp(user: User): Promise<User> {
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
}
