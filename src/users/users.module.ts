import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './repositories/users.repository';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { WhoAmIUseCase } from './use-cases/who-am-i.use-case';

@Module({
  providers: [
    UsersResolver,
    DeleteUserUseCase,
    WhoAmIUseCase,
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersRepository,
    },
  ],
})
export class UsersModule {}
