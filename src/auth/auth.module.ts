import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './guards';
import { JwtStrategy } from './strategies';
import { CryptoUtils } from 'src/utils/crypto.utils';
import { AuthRepository } from './repository/auth.repository';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { GenerateTokenUtils } from 'src/utils/generate-token.utils';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret_token_key,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    AuthResolver,
    JwtStrategy,
    CryptoUtils,
    GenerateTokenUtils,
    RefreshTokenUseCase,
    SignUpUseCase,
    SignInUseCase,
    AuthRepository,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: 'IAuthRepository',
      useExisting: AuthRepository,
    },
  ],
})
export class AuthModule {}
