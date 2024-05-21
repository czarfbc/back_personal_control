import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => String, { name: 'getHello' })
  getHello() {
    return this.appService.getHello();
  }
}
