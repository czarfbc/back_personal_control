import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SignInAuthInput, SignUpAuthInput, RefreshTokenAuthInput } from './dto';
import { Auth } from './entities';
import { Public } from 'src/decorators';
import { Inject } from '@nestjs/common';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case';

@Resolver(() => Auth)
export class AuthResolver {
  @Inject()
  private signUpUseCase: SignUpUseCase;

  @Inject()
  private signInUseCase: SignInUseCase;

  @Inject()
  private refreshTokenUseCase: RefreshTokenUseCase;

  @Public()
  @Mutation(() => Auth)
  signUp(@Args('signUpAuthInput') signUpAuthInput: SignUpAuthInput) {
    return this.signUpUseCase.execute(signUpAuthInput);
  }

  @Public()
  @Mutation(() => Auth)
  signIn(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.signInUseCase.execute(signInAuthInput);
  }

  @Public()
  @Mutation(() => Auth)
  refreshToken(
    @Args('refreshTokenAuthInput') refreshTokenAuthInput: RefreshTokenAuthInput,
  ) {
    return this.refreshTokenUseCase.execute(
      refreshTokenAuthInput.refresh_token,
    );
  }
}
