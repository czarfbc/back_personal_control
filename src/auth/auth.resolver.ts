import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInAuthInput, SignUpAuthInput } from './dto';
import { Auth } from './entities';
import { Public } from 'src/decorators';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  signUp(@Args('signUpAuthInput') signUpAuthInput: SignUpAuthInput) {
    return this.authService.signUp(signUpAuthInput);
  }

  @Public()
  @Mutation(() => Auth)
  signIn(@Args('signInAuthInput') signInAuthInput: SignInAuthInput) {
    return this.authService.signIn({
      email: signInAuthInput.email,
      password: signInAuthInput.password,
    });
  }
}
