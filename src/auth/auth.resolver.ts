import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignInAuthInput, SignUpAuthInput } from './dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signUp(@Args('signUpAuthInput') signUpAuthInput: SignUpAuthInput) {
    return this.authService.signUp(signUpAuthInput);
  }

  @Mutation(() => Auth)
  signIn(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.authService.signIn({
      email: signInAuthInput.email,
      password: signInAuthInput.password,
    });
  }
}
