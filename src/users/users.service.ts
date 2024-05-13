import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    const createUser = this.prismaService.user.create({
      data: createUserInput,
    });

    return createUser;
  }

  findAll() {
    const findAll = this.prismaService.user.findMany();

    return findAll;
  }

  findOne(id: number) {
    const findOne = this.prismaService.user.findUnique({
      where: { id },
    });

    return findOne;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const update = this.prismaService.user.update({
      where: { id },
      data: updateUserInput.password,
    });

    return update;
  }

  remove(id: number) {
    const remove = this.prismaService.user.delete({
      where: { id },
    });

    return remove;
  }
}
