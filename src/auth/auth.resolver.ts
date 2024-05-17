import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { AuthInput } from './dto/auth.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signIn(@Args('authInput') authInput: AuthInput) {
    return this.authService.signIn(authInput.email, authInput.password);
  }

  @Mutation(() => Auth)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
