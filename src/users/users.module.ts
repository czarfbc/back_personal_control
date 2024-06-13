import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CryptoUtils } from 'src/utils/crypto.utils';
import { UsersRepository } from './repository/users.repository';
import { CreateUserUseCase } from './use_cases/create-user.use-case';
import { DeleteUserUseCase } from './use_cases/delete-user.use-case';
import { WhoAmIUseCase } from './use_cases/who-am-i.use-case';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    CryptoUtils,
    CreateUserUseCase,
    DeleteUserUseCase,
    WhoAmIUseCase,
    UsersRepository,
    {
      provide: 'IUsersRepository',
      useExisting: UsersRepository,
    },
  ],
  exports: [UsersService, CreateUserUseCase],
})
export class UsersModule {}
