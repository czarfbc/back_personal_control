import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IPayloadAuth } from '../../helpers/interfaces/payload-auth.interface';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { IAuthRepository } from '../repository/auth.repository';
import { GenerateTokenUtils } from 'src/utils';

@Injectable()
export class RefreshTokenUseCase {
  @Inject('IAuthRepository')
  private authRepository: IAuthRepository;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private generateTokenUtils: GenerateTokenUtils;

  async execute(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const payload = await this.verifyRefreshToken(refreshToken);

    const finduserId = await this.findUserById(payload.sub);

    const tokens = await this.generateTokenUtils.generateToken(
      finduserId.id,
      finduserId.name,
      finduserId.email,
    );

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  private async verifyRefreshToken(refreshToken: string) {
    const payload: IPayloadAuth = await this.jwtService.verify(refreshToken, {
      secret: jwtConstants.secret_refresh_token_key,
    });

    if (payload.type !== 'refresh_token') {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }

  private async findUserById(id: number) {
    const findUserId = await this.authRepository.findOneById(id);

    if (!findUserId) {
      throw new Error('User not found');
    }

    return findUserId;
  }
}
