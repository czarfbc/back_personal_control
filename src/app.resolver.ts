import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Public } from './decorators';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Query(() => String, { name: 'getHello' })
  getHello() {
    return this.appService.getHello();
  }
}
