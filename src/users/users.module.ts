import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CryptoUtils } from 'src/utils/crypto.utils';

@Module({
  providers: [UsersResolver, UsersService, CryptoUtils],
  exports: [UsersService],
})
export class UsersModule {}
