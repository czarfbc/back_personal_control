import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { CryptoUtils } from 'src/utils/crypto.utils';
import { UsersRepository } from './repositories/users.repository';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { WhoAmIUseCase } from './use-cases/who-am-i.use-case';

@Module({
  providers: [
    UsersResolver,
    CryptoUtils,
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
