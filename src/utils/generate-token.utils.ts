import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { IPayloadAuth } from 'src/auth/interfaces';

@Injectable()
export class GenerateTokenUtils {
  @Inject()
  private jwtService: JwtService;

  async generateToken(
    sub: number,
    username: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: IPayloadAuth = {
      sub,
      username,
      email,
    };

    const [access_token, refresh_token] = [
      this.jwtService.sign({ ...payload, type: 'access_token' }),
      this.jwtService.sign(
        { ...payload, type: 'refresh_token' },
        { expiresIn: '7d', secret: jwtConstants.secret_refresh_token_key },
      ),
    ];

    return {
      access_token,
      refresh_token,
    };
  }
}